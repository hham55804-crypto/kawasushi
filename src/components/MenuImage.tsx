import React, { useState } from 'react';

export default function MenuImage({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const [error, setError] = useState(false);
  
  if (error) {
    const filename = src.split('/').pop();
    return (
      <div className={`flex items-center justify-center border border-dashed border-kawa-gold/40 bg-kawa-green-dark/30 text-kawa-gold/70 text-xs px-4 text-center rounded shadow-inner ${className}`}>
         Export Image<br/>"{filename}"<br/>from PDF into /public/images/
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)}
      className={`object-cover rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-kawa-gold/10 ${className}`} 
    />
  );
}
