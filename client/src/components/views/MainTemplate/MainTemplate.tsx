import React, { ReactNode } from 'react';
import { NavBar } from '../../navigation/navBar/NavBar';
import Footer from '../../sections/footer/Footer';
import { BrowserRouter } from 'react-router-dom';

const MainTemplate: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <NavBar />
      {children}
      <Footer />
    </BrowserRouter>
  );
};

export default MainTemplate;
