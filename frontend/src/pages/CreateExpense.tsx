/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, SyntheticEvent } from 'react';
import Navigation from '../components/Navigation';
import { FidgetSpinner } from 'react-loader-spinner'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Footer from '../components/Footer';

interface CreateExpenseProps {
  state: {
    web3:any;
    contract: any;
    account: string;
  };
}

const CreateExpense: FC<CreateExpenseProps> = ({ state }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  const createExpense = async (event: SyntheticEvent) => {
    event.preventDefault();
    const {contract,account } = state;
    const expenseDescription = (document.querySelector('#expenseDescription') as HTMLInputElement).value;
    const expenseDate = (document.querySelector('#expenseDate') as HTMLInputElement).value;
    const expenseAmount = (document.querySelector('#expenseAmount') as HTMLInputElement).value;

    try {
     
      setIsLoading(true)
     const data ={status:200}
      if (data.status === 200) {
        if (contract && contract.methods) {
         await contract.methods.createExpense(expenseDescription,expenseAmount,expenseDate).send({ from: account });
        
         setModalContent(`Expense ${expenseDescription} added at ${expenseDate} of amount ${expenseAmount}`);
         setModalOpen(true);
         setIsLoading(false);
        }
      } else {
        throw new Error('Expense cannot be added');
      }
    } catch (error) {
      console.log(error);
      
      setModalContent(`Error Adding Expense`);
      setModalOpen(true);

    } finally {
      setIsLoading(false)
    }
  };



  const card = (
    <React.Fragment>
      <CardContent>
    <h2>Create Expense</h2>

      <form onSubmit={createExpense} id="myform">
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
          <button type="submit">Add Expense</button>
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
      <div className="create_expense expense_btn card-container">
      <div className="">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      
  <Card sx={{ bgcolor: '#121621', color: '#ffffff', borderRadius: 8, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: 3 }} variant="outlined">{card}</Card>
</Box>
        </div>
       
              
        {modalOpen && (
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

export default CreateExpense;