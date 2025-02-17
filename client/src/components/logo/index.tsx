import { AudioWaveform } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  url?: string;
  className?: string;
  linkWrapper?: boolean;
}

const Logo = ({ url = "/", className = "", linkWrapper = true }: LogoProps) => {
  const logoContent = (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
      <AudioWaveform className="size-4" />
    </div>
  );

  return (
    <div className={`flex items-center justify-center sm:justify-start ${className}`}>
      {linkWrapper ? (
        <Link to={url}>{logoContent}</Link>
      ) : (
        logoContent
      )}
    </div>
  );
};

export default Logo;
