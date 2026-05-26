import { useEffect, useState } from 'react';

export default function SkeletonImage({
  src,
  alt,
  wrapperClassName = '',
  imageClassName = '',
  skeletonClassName = '',
  onLoad,
  onError,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setLoaded(true);
    onError?.(event);
  };

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-brand-secondary/10 via-white/60 to-brand-secondary/10 ${skeletonClassName}`}
        />
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`relative z-10 ${imageClassName} ${loaded ? '' : 'opacity-0'}`}
      />
    </div>
  );
}
