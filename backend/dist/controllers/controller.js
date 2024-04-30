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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalExpense = exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getAllExpenses = exports.createExpense = void 0;
const contract_2 = require("../contract/contract");
const web3_2 = __importDefault(require("web3"));
const ABI_json_1 = __importDefault(require("../ABI.json"));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount, date } = req.body;
        const web3_1 = new web3_2.default(req.body.web3);
        const contract_1 = new web3_1.eth.Contract(ABI_json_1.default, req.body.accountAddress);
        const result = yield contract_1.methods.createExpense(description, Number(amount), date).send({ from: req.body.accountAddress });
        res.status(201).json({ status: 200, expensesList: result, message: "Expenses Added" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.createExpense = createExpense;
// export const createExpense = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { description, amount, date, accountAddress } = req.body;
//       // Prepare the transaction data
//       const data = contract.methods.createExpense(description, Number(amount), date).encodeABI();
//       // Estimate gas and get gas price
//       const gas = await contract.methods.createExpense(description, Number(amount), date).estimateGas({ from: accountAddress });
//       const gasPrice = await web3.eth.getGasPrice();
//       // Construct the transaction object
//       const transactionObject = {
//         from: accountAddress,
//         to: contract.options.address,
//         data: data,
//         gas: gas,
//         gasPrice: gasPrice,
//       };
//       // Sign the transaction locally
//      // const signedTx = await web3.eth.accounts.signTransaction(transactionObject, 'H4bipx15LZsH5CN5zG6l6lLMnJIGZ3RgwvkrM5ujQZqqrOZrJc4Qsw'); // Replace '0xYourPrivateKey' with your private key
//       // Send the raw transaction
//       //const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//       const result = await sendRawTransaction(transactionObject);
//       res.status(201).json({ status: 200, expensesList: result, message: "Expenses Added" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ status: 500, message: "Internal Server error" });
//     }
//   };
const getAllExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield contract_2.contract.methods.getAllExpenses().call();
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
        const expense = yield contract_2.contract.methods.viewExpense(id2).call();
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
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { description, amount, date } = req.body;
        const result = yield contract_2.contract.methods.updateExpense(id, description, amount, date).send({ from: req.body.accountAddress });
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield contract_2.contract.methods.deleteExpense(id).send({ from: req.body.accountAddress });
        res.status(204).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal Server error" });
    }
});
exports.deleteExpense = deleteExpense;
const getTotalExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield contract_2.contract.methods.getAllExpenses().call();
        if (Array.isArray(expenses) && expenses.length > 0) {
            let totalExpense = 0;
            expenses.forEach((expense) => {
                totalExpense += parseInt(expense.amount);
            });
            res.status(200).json({ totalExpense });
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