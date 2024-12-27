import HorizontalLine from '../../ui/horizontalLine/HorizontalLine';
import c from './SectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  description?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => {
  return (
    <div className={c.descriptionContent}>
      <div className={c.title}>
        <HorizontalLine width="10vw" />
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionTitle;
