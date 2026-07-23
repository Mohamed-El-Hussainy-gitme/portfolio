'use client';

import Image from 'next/image';

type LazyImageProps = {
  src?: string | null;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function LazyImage({ src, alt = '', className = '', fill, width, height }: LazyImageProps) {
  if (!src) {
    return <div className={`bg-slate-100 ${className}`} aria-hidden />;
  }

  if (fill) {
    return (
      <Image src={src} alt={alt} fill className={`object-cover ${className}`} sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} width={width} height={height} loading="lazy" />
  );
}
