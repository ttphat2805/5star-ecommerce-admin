import images from '~/assets/images';
import Image from '../Image';

interface LogoProps {
    height?: number;
    width?: number;
    className?: string;
    src?: any;
}

function Logo({ className, src = images.logoBlack }: LogoProps) {
    return <Image src={src} alt="Logo 5Star" className={className} />;
}

export default Logo;
