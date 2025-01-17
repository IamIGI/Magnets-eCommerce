import c from './Loading.module.scss';

const Loading = () => {
  return (
    <div className="center">
      <div className={c.loader} />
    </div>
  );
};

export default Loading;
