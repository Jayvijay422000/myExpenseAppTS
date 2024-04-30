"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalExpense = exports.getExpenseById = exports.getAllExpenses = void 0;
const contract_1 = require("../contract/contract");
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield contract_1.contract.methods.getAllExpenses().call();
        expensesList = [];
        if (Array.isArray(expenses)) {
            // Convert BigInt values to strings
            var expensesList = expenses.map((expense) => ({
                expenseId: expense.id.toString(),
                description: expense.description,
                amount: expense.amount.toString(),
                date: expense.date,
            }));
        }
        res.status(200).json({ status: 200, expensesList: expensesList, message: "Expense Added" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.getAllExpenses = getAllExpenses;
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id2 = parseInt(req.params.id);
        const expense = yield contract_1.contract.methods.viewExpense(id2).call();
        const { id, description, amount, date } = expense;
        // Convert BigInt amount to string
        const amountString = amount.toString();
        const expenseObj = {
            expenseId: id.toString(),
            description,
            amount: amountString,
            date
        };
        console.log(expenseObj);
        res.status(200).json({ status: 200, expensesList: expenseObj, message: "Expense Exist" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.getExpenseById = getExpenseById;
const getTotalExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield contract_1.contract.methods.getAllExpenses().call();
        if (Array.isArray(expenses) && expenses.length > 0) {
            let totalExpense = 0;
            expenses.forEach((expense) => {
                totalExpense += parseInt(expense.amount);
            });
            res.status(200).json({ status: 200, totalExpense: totalExpense });
        }
        else {
            res.status(200).json({ totalExpense: 0 });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.getTotalExpense = getTotalExpense;
//# sourceMappingURL=controller.js.map