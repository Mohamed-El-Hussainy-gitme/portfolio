import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export interface FaqItem {
  q: { en: string; ar: string };
  a: { en: string; ar: string };
}

interface FaqEditorProps {
  label?: string;
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}

export default function FaqEditor({
  label = 'الأسئلة الشائعة (FAQs)',
  items,
  onChange,
}: FaqEditorProps) {
  const handleAdd = () => {
    onChange([...items, { q: { en: '', ar: '' }, a: { en: '', ar: '' } }]);
  };

  const handleUpdate = (index: number, key: 'q' | 'a', lang: 'en' | 'ar', value: string) => {
    const next = [...items];
    next[index] = {
      ...next[index],
      [key]: {
        ...next[index][key],
        [lang]: value,
      },
    };
    onChange(next);
  };

  const handleRemove = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    onChange(next);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    onChange(next);
  };

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border">
      <div className="flex justify-between items-center">
        <Label className="font-heading text-lg">{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة سؤال
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">لا يوجد أسئلة شائعة بعد. اضغط إضافة للبدء.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-md space-y-3 bg-background relative">
              <div className="absolute left-2 top-2 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={idx === 0}
                  onClick={() => handleMoveUp(idx)}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMoveDown(idx)}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() => handleRemove(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="font-heading text-sm text-muted-foreground mb-2">سؤال {idx + 1}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>السؤال (EN)</Label>
                  <Input
                    value={item.q.en}
                    onChange={(e) => handleUpdate(idx, 'q', 'en', e.target.value)}
                    dir="ltr"
                    placeholder="Question in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>السؤال (AR)</Label>
                  <Input
                    value={item.q.ar}
                    onChange={(e) => handleUpdate(idx, 'q', 'ar', e.target.value)}
                    dir="rtl"
                    placeholder="السؤال بالعربية"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الإجابة (EN)</Label>
                  <Textarea
                    value={item.a.en}
                    onChange={(e) => handleUpdate(idx, 'a', 'en', e.target.value)}
                    dir="ltr"
                    rows={2}
                    placeholder="Answer in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الإجابة (AR)</Label>
                  <Textarea
                    value={item.a.ar}
                    onChange={(e) => handleUpdate(idx, 'a', 'ar', e.target.value)}
                    dir="rtl"
                    rows={2}
                    placeholder="الإجابة بالعربية"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
