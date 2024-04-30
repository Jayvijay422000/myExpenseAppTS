import { useState, FC } from 'react';
import Navigation from '../components/Navigation';
import { FidgetSpinner } from 'react-loader-spinner'
import Footer from '../components/Footer';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

interface Expense {
  expenseId: number | null;
  description: string | null;
  amount: string | null;
  date: string | null;
}

const ViewExpense: FC = () => {
  const [expense, setExpense] = useState<Expense>({ expenseId: null, description: null, amount: null, date: null });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const viewExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const expenseID = document.querySelector<HTMLInputElement>('#expenseID')?.value;
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/ethereum/expenses/${expenseID}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();

      if (data.status === 200) {
        console.log(data.expensesList);
        setExpense(data.expensesList);
      } else {
        throw new Error();
      }
    } catch (error) {
      setModalContent('Expense does not exist');
      setModalVisible(true);
    } finally {
      setIsLoading(false)
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent('');
  };


  const card = (
    <React.Fragment>

      <CardContent>
        <h2>View Expense</h2>
        <form onSubmit={viewExpense} id='myform'>
          <label>
            ID:
            <input id="expenseID" />
          </label>
          <button type="submit">View Expense</button>

          <FidgetSpinner
            backgroundColor="#4D36F6"
            height="80"
            width="80"
            ariaLabel="fidget-spinner-loading"
            wrapperStyle={{}}
            wrapperClass="fidget-spinner-wrapper"
            visible={isLoading}
          />
        </form>
      </CardContent>

    </React.Fragment>
  );

  return (
    <>
      <Navigation />
      <div className="view_expense expense_btn">

        {expense.expenseId !== 0 && expense.date !== '' && expense.description !== '' && expense.amount !== '' ? (
          <div className="view_expense_by_id  view_all_expenses_card">
            <p>{expense.expenseId}</p>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.date}</p>
          </div>
        ) : (
          <div className="empty_div"> </div>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

          <Card sx={{ bgcolor: '#121621', color: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: 3 }} variant="outlined">{card}</Card>
        </Box>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewExpense;