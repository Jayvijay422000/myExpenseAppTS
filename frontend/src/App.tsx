/* eslint-disable @typescript-eslint/no-explicit-any */
import  { FC, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateExpense from './pages/CreateExpense';
import Wallet from './pages/Wallet';
import ViewAllExpense from './pages/ViewAllExpense';
import UpdateExpense from './pages/UpdateExpense';
import ViewExpense from './pages/ViewExpense';
import DeleteExpense from './pages/DeleteExpense';

import './App.css';

interface AppState {
  web3: any;
  contract: any;
  account: any;
}

const App: FC = () => {
  const [state, setState] = useState<AppState>({ web3: null, contract: null, account: null });

  const saveState = ({ web3, contract, account }: AppState) => {
    setState({ web3: web3, contract: contract, account: account });
  };

  const router = createBrowserRouter([
    { path: '/', element: <Wallet saveState={saveState} /> },
    { path: '/view-all-expense', element: <ViewAllExpense /> },
    { path: '/create-expense', element: <CreateExpense state={state} /> },
    { path: '/view-expense', element: <ViewExpense /> },
    { path: '/update-expense', element: <UpdateExpense state={state} /> },
    { path: '/delete-expense', element: <DeleteExpense state={state} /> }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;