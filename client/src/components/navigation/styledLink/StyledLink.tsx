import classes from './StyledLink.module.scss';

interface LinkProps {
  name: string;
  url: string;
}

const StyledLink = ({ name, url }: LinkProps) => {
  return (
    <a
      className={classes.btnFlip}
      data-back={name}
      data-front={name}
      href={url}
    />
  );
};

export default StyledLink;
