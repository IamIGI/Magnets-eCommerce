import c from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={c.wrapper}>
      <div className={c.content}>
        <div className={c.column}>
          <h3>MAGNES SHOP</h3>
          <p>
            We print your memories and deliver to your door since 2023. We are
            based in Cracow, Poland
          </p>
        </div>
        <div className={c.column}>
          <h3>SOCIALS</h3>
          <ul>
            <li>
              <a href="/">facebook</a>
            </li>
            <li>
              <a href="/">instagram</a>
            </li>
          </ul>
        </div>
        <div className={c.column}>
          <h3>CONTACT</h3>
          <ul>
            <li>Kraków, Purdniecie 2/50</li>
            <li>magnetsBusiness@gmail.com</li>
            <li>NIP: 1231231239</li>
          </ul>
        </div>
      </div>
      <div className={c.rights}>
        <p>© 2024, MAGNES SHOP. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
