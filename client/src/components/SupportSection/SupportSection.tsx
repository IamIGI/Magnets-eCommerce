import classes from './SupportSection.module.scss';

const SupportSection = () => {
  const items = [
    {
      id: crypto.randomUUID(),
      title: 'WYSYŁKA',
      desc: 'Wysyłka następnego dnia roboczego',
      imgName: 'delivery.svg',
    },
    {
      id: crypto.randomUUID(),
      title: 'GWARANCJA',
      desc: 'Gwarancja zwrotu pieniędzy / wymiany uszkodzonych produktów do 14 dni',
      imgName: 'guarantee.svg',
    },
    {
      id: crypto.randomUUID(),
      title: 'WSPARCIE',
      desc: 'Wsparcie klienta na każdym etapie',
      imgName: 'support.svg',
    },
  ];
  return (
    <div className={classes.wrapper}>
      {items.map((item) => (
        <div className={classes.itemWrapper} key={item.id}>
          <img src={`svg/support/${item.imgName}`} alt={item.title} />
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default SupportSection;
