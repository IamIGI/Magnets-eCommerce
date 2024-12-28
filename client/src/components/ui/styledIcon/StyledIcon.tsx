import c from './StyledIcon.module.scss';

interface StyledIconProps {
  src: string;
  alt: string;
  size?: string;
  handleClick?: () => void;
}

const StyledIcon = ({ src, alt, handleClick, size }: StyledIconProps) => {
  return (
    <button
      className={`${c.wrapper} black-svg-icon`}
      style={size ? { height: size, width: size } : {}}
      onClick={() => {
        console.log('t2');
        if (handleClick) handleClick();
      }}
    >
      <img src={src} alt={alt} />
    </button>
  );
};

export default StyledIcon;
