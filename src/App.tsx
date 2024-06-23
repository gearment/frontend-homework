import React from 'react';
import Routes from './routes/Routes';
import { InvoicesProvider } from 'contexts/InvoicesContext';

function App() {
  return (
    <>
      <InvoicesProvider>
        <Routes />
      </InvoicesProvider>
    </>
  );
}

export default App;
