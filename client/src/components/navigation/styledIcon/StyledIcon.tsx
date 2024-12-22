import classes from './StyledIcon.module.scss';

interface StyledIconProps {
  src: string;
  alt: string;
}

const StyledIcon = ({ src, alt }: StyledIconProps) => {
  return (
    <button className={`${classes.wrapper} black-svg-icon`}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default StyledIcon;
