// expenseRoutes.ts
import express from 'express';
import * as expenseController from '../controllers/controller';

const router = express.Router();

router.get('/expenses', expenseController.getAllExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.get('/total-expense',expenseController.getTotalExpense);

export default router;
