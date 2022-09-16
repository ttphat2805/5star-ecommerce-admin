import { useState } from 'react';
import images from '~/assets/images';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
}

function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }: ImageProps) {
    const [fallback, setFallback] = useState<string>('');
    const handleError = () => {
        setFallback(customFallback);
    };
    return <img src={fallback || src} className={className} alt={alt} {...props} onError={handleError} />;
}

export default Image;
