import React from 'react';
import { Button } from './components/Button';
import { Table } from './components/Table';


const App: React.FC = () => {
  return (
    <>
      <Button type={'secondary'} text="novo" iconCheck='fa-plus'/>

      <Table 
        columns={[
          { title: 'Código', field: 'CODPST' },
          { title: 'Nome', field: 'NOMPST' },
        ]}
        data={[]} />
    </>
  );
};

export default App;
