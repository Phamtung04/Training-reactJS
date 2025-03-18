import React, { Fragment } from 'react';
import Contents from '../components/sidebar/Content';
import Header from '../components/header/Header';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <Contents/>
    </Fragment>
  );
};

export default Layout;
