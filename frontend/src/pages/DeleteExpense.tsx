/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import Navigation from '../components/Navigation';
import { FidgetSpinner } from 'react-loader-spinner'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Footer from '../components/Footer';


interface DeleteExpenseProps {
  state: {
    contract: any;
    account: string;
  };
}

const DeleteExpense: FC<DeleteExpenseProps> = ({ state }) => {
  const [expense, setExpense] = useState<{ expenseId: number | null ;description: string | null;amount:number| null; date: string | null }>({
    expenseId: null,
    description: null,
    amount:null,
    date: null,
    
  });

  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading,setIsLoading]=useState<boolean>(false);


  const { contract, account } = state;

  const deleteExpense = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
    
      event.preventDefault();
      const expenseID = (document.querySelector('#expenseId') as HTMLInputElement).value;
      const res = await fetch(`http://localhost:3000/api/ethereum/expenses/${expenseID}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.status === 200 && data.expensesList.expenseId != '0') {
        setExpense(data.expensesList);

        if (contract && contract.methods) {
          setIsLoading(true)
          await contract.methods.deleteExpense(expenseID).send({ from: account });
          setModalContent("Expense Deleted");
          setModalVisible(true);
        }
      } else {
        throw new Error("No Expense Exists");
      }
    } catch (error ) {
      if (error instanceof Error) {
        setModalContent(error.message);
      } else {
        setModalContent("An unknown error occurred.");
      }
      setModalVisible(true)
    }
    finally{
      setIsLoading(false);

    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  const card = (
    <React.Fragment>
      <CardContent> 
      <h2>Delete Expense</h2>
      <form onSubmit={deleteExpense} id="myform">
          <label>
            ID:
            <input id="expenseId" />
          </label>
          <button type="submit">Delete Expense</button>
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
        {expense.expenseId !== null && expense.description !== null && expense.amount && expense.date !== null ? (
          <div className="view_expense_by_id  view_all_expenses_card">
            <p>Expense ID: {expense.expenseId}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
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
      <Footer/>
    </>
  );
};

export default DeleteExpense;