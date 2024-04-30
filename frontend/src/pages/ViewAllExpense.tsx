import { FC, useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { FidgetSpinner } from 'react-loader-spinner'
import Footer from '../components/Footer';


interface Expense {
  expenseId: number;
  description: string;
  amount: string;
  date: string;
}

const ViewAllExpense: FC = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    const allExpense = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3000/api/ethereum/expenses', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await res.json();
        console.log(data);

        if (data.status === 200) {
          let totalExpense = 0;
          data.expensesList.forEach((expense: Expense) => {
            totalExpense += parseInt(expense.amount);
          });
          setTotalExpense(totalExpense);
          setExpenseList(data.expensesList);
        }
      } catch (error) {
        console.error(error);

      } finally {
        setIsLoading(false);

      }
    };
    allExpense();
  }, []);
 const mystyle ={
  backgroundColor: "#121621",
  color: "white",
 }
  return (
    <>
      <Navigation />
      <div className="view_all_expenses">
        {expenseList.map((expense) => {
          console.log(expense)
          return (

            <div
              className="view_all_expenses_card"
              key={expense.expenseId}
              style={expense.expenseId !== 0 && expense.date !== '' && expense.description !== '' && expense.amount !== '' ? {} : { display: 'none' }}
            >
              <p>{expense.expenseId}</p>
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
              <p>{expense.date}</p>


            </div>


          );



        })}


        <div style={mystyle}
          className="view_all_expenses_card"
        ><p>Total</p><p> </p><p>{totalExpense}</p></div>
        <FidgetSpinner
          backgroundColor="#4D36F6"
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
          visible={isLoading}
        />
      </div>
      <Footer />
    </>
  );
};

export default ViewAllExpense;