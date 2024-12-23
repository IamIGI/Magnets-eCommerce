import classes from './HorizontalLine.module.scss';

interface HorizontalLineProps {
  width?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({ width }) => {
  return (
    <p
      className={classes.horizontalLine}
      style={width ? { width: width } : {}}
    ></p>
  );
};

export default HorizontalLine;
