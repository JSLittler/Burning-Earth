import React from 'react';

import PageHeader from '../pageHeader/pageHeader';

import './styles.module.scss';

const Page = ({
  children,
  clearCountryView
}) => {
  return (
    <div id="page" data-testid="page" className="panelBackground">
      <div id="panel" className="panel">
        <PageHeader clearCountryView={clearCountryView} />
        <main autoFocus>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Page;
