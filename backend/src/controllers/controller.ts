import { Request, Response } from 'express';
import { contract } from '../contract/contract'; 



export interface Expense {
    id: number;
    description: string;
    amount: string; 
    date: string;
  }

  interface ExpenseList {
    expenseId: string;
    description: string;
    amount: string; 
    date: string;
  }


  interface ExpenseObj {
    expenseId: string;
    description: string;
    amount: string; 
    date: string;
  }



export const getAllExpenses = async (req: Request, res: Response): Promise<void> => {
  try {

    const expenses = await contract.methods.getAllExpenses().call();
    expensesList=[]
    if (Array.isArray(expenses)) {
        // Convert BigInt values to strings
          var expensesList:ExpenseList[] = expenses.map((expense: any) => ({
            expenseId: expense.id.toString(),
            description: expense.description,
            amount:expense.amount.toString(),
          date: expense.date,
        }));
    }
    res.status(200).json({ status: 200,expensesList: expensesList, message: "Expense Added" });
      
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500,message: "Internal Server error" });
  }
};



export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
      const id2: number = parseInt(req.params.id);
      
      const expense: Expense = await contract.methods.viewExpense(id2).call();
      const { id, description, amount, date } = expense;

      // Convert BigInt amount to string
      const amountString = amount.toString();

      const expenseObj: ExpenseList = {
          expenseId: id.toString(),
          description,
          amount: amountString,
          date
      };
      console.log(expenseObj)
      res.status(200).json({ status: 200,expensesList: expenseObj, message: "Expense Exist" });
  } catch (error) {
      console.error(error);
      res.status(500).send({ status: 500, message: "Internal Server error" });
  }
};

  


export const getTotalExpense = async (req: Request, res: Response): Promise<void> => {
    try {
      const expenses = await contract.methods.getAllExpenses().call();
      
      if (Array.isArray(expenses) && expenses.length > 0) {
        let totalExpense = 0;
        expenses.forEach((expense: any) => {
          totalExpense += parseInt(expense.amount);
        });
  
        res.status(200).json({status:200, totalExpense:totalExpense });
      } else {
        res.status(200).json({ totalExpense: 0 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 500,message: "Internal Server error" });
    }
  };