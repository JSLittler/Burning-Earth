import React from 'react';

import PageHeader from '../pageHeader';

import './styles.module.scss';

const Page = ({
  children,
}) => {
  return (
    <div id="page" data-testid="page" className="panelBackground">
      <div id="panel" className="panel">
        <PageHeader />
        <main autoFocus>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Page;
