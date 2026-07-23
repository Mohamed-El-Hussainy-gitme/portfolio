import { supabase } from './supabase';

const TABLE_MAP = {
  SiteSettings: 'site_settings',
  Project: 'projects',
  BlogPost: 'blog_posts',
  Service: 'services',
  Skill: 'skills',
  Review: 'reviews',
  ContactMessage: 'contact_messages',
} as const;

type EntityName = keyof typeof TABLE_MAP;

function createEntityStore(entityName: EntityName) {
  const table = TABLE_MAP[entityName];

  const parseSort = (sortField?: string) => {
    if (!sortField) return { column: 'created_at', ascending: false };
    const desc = sortField.startsWith('-');
    return { column: desc ? sortField.slice(1) : sortField, ascending: !desc };
  };

  return {
    list: async (sortField?: string) => {
      const { column, ascending } = parseSort(sortField);
      const { data, error } = await supabase.from(table).select('*').order(column, { ascending });
      if (error) throw error;
      return data ?? [];
    },

    filter: async (query: Record<string, unknown>) => {
      let req = supabase.from(table).select('*');
      for (const [key, value] of Object.entries(query)) {
        req = req.eq(key, value);
      }
      const { data, error } = await req;
      if (error) throw error;
      return data ?? [];
    },

    get: async (id: string) => {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    },

    create: async (payload: Record<string, unknown>) => {
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (error) throw error;
      return data;
    },

    update: async (id: string, payload: Record<string, unknown>) => {
      const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },

    delete: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    },
  };
}

const auth = {
  me: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      const err = new Error('Not authenticated') as Error & { status?: number };
      err.status = 401;
      throw err;
    }
    const u = session.user;
    return {
      id: u.id,
      email: u.email,
      name: u.user_metadata?.full_name ?? u.email,
      role: 'admin',
    };
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const err = new Error(error.message) as Error & { status?: number };
      err.status = 401;
      throw err;
    }
    const u = data.user;
    return {
      id: u.id,
      email: u.email,
      name: u.user_metadata?.full_name ?? u.email,
      role: 'admin',
    };
  },

  logout: async (redirectUrl?: string) => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      window.location.href = redirectUrl || '/admin/login';
    }
  },

  redirectToLogin: (returnUrl?: string) => {
    const from = returnUrl ? `?from=${encodeURIComponent(returnUrl)}` : '';
    if (typeof window !== 'undefined') {
      window.location.href = `/admin/login${from}`;
    }
  },
};

const integrations = {
  Core: {
    UploadFile: async ({ file }: { file: File }) => {
      const ext = file.name.split('.').pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const path = `uploads/${name}`;
      const { error } = await supabase.storage.from('media').upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from('media').getPublicUrl(path);
      return { file_url: data.publicUrl };
    },
  },
};

export const apiClient = {
  entities: {
    SiteSettings: createEntityStore('SiteSettings'),
    Project: createEntityStore('Project'),
    BlogPost: createEntityStore('BlogPost'),
    Service: createEntityStore('Service'),
    Skill: createEntityStore('Skill'),
    Review: createEntityStore('Review'),
    ContactMessage: createEntityStore('ContactMessage'),
  },
  auth,
  integrations,
};
