/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import Navigation from '../components/Navigation';
import { FidgetSpinner } from 'react-loader-spinner'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Footer from '../components/Footer';


interface UpdateExpenseProps {
  state: {
    contract: any;
    account: string;
  };
}

const UpdateExpense: FC<UpdateExpenseProps> = ({ state }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);


  const closeModal = (): void => {
    setModalVisible(false);
    setModalContent('');
  };

  const { contract, account } = state;

  const updateExpense = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const expenseDescriptionElement = document.querySelector<HTMLInputElement>('#expenseDescription');
    const expenseAmountElement = document.querySelector<HTMLInputElement>('#expenseAmount');
    const expenseDateElement = document.querySelector<HTMLInputElement>('#expenseDate');
    const expenseIdElement = document.querySelector<HTMLInputElement>('#expenseId');

    if (expenseDescriptionElement && expenseAmountElement && expenseDateElement && expenseIdElement) {
      const expenseDescription = expenseDescriptionElement.value;
      const expenseAmount = expenseAmountElement.value;
      const expenseDate = expenseDateElement.value;
      const expenseId =expenseIdElement.value;
  
    try {
      const expenseID = (document.querySelector('#expenseId') as HTMLInputElement).value;
      const res = await fetch(`http://localhost:3000/api/ethereum/expenses/${expenseID}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.status === 200 && data.expensesList.expenseId != '0') {
        setIsLoading(true)
        await contract.methods.updateExpense(expenseId,expenseDescription,expenseAmount,expenseDate).send({ from: account });
        setModalContent(`Expense ID ${expenseId} updated with expense name ${expenseDescription} and date ${expenseDate}`);
        setModalVisible(true);
        setIsLoading(false)

      } else {
        throw new Error('Expense cannot be updated because of date clash');
      }
    } catch (error) {
      setModalContent('Expense cannot be updated');
      setIsLoading(false)
      setModalVisible(true);
    }
  }
  };

  const card = (
    <React.Fragment>
      <CardContent>
    <h2>Update Expense</h2>

      <form onSubmit={updateExpense} id="myform">
        <label>
            Id
            <input id="expenseId" />
          </label>
        <label>
            Amount
            <input id="expenseAmount" />
          </label>
          <label>
            Description
            <input id="expenseDescription" />
          </label>
          <label>
            Date:
            <input id="expenseDate" type="date" />
          </label>
          <button type="submit">Update Expense</button>
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
      <div className="update_expense expense_btn">
      
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

export default UpdateExpense;