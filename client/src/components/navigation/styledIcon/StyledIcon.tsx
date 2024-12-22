import classes from './StyledIcon.module.scss';

interface StyledIconProps {
  src: string;
  alt: string;
  size?: string;
  handleClick?: () => void;
}

const StyledIcon = ({ src, alt, handleClick, size }: StyledIconProps) => {
  return (
    <button
      className={`${classes.wrapper} black-svg-icon`}
      style={size ? { height: size, width: size } : {}}
      onClick={handleClick}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export default StyledIcon;
