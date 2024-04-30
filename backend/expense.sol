// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ExpenseTracker {

    struct Expense {
        uint id;
        string description;
        uint amount;
        string date;
    }

    address owner;

    mapping(uint => Expense) expenses;
    uint  expenseId=1;
    event ExpenseCreate(uint  expenseId, string description, uint amount, string date);
    event ExpenseUpdate(uint  expenseId, string description, uint amount, string date);
    event ExpenseDelete(uint  expenseId);

    modifier checkId(uint id){
        require(id != 0 && id <= expenseId, "Invalid Id");
        _;
    }

     modifier checkAMount(uint amount){
        require(amount <= 0, "Invalid Amount");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Invalid Owner");
        _;
    }

    constructor(){
        owner = msg.sender;
        expenseId = 1; // Initialize expenseId to 1
    }

    function createExpense(string calldata _description, uint _amount, string calldata _date) public {
        expenses[expenseId] = Expense(expenseId, _description, _amount, _date);
        expenseId++;
        emit ExpenseCreate(expenseId, _description, _amount, _date);
        
    }

    function updateExpense(uint _expenseId, string calldata _description, uint _amount, string calldata _date) public onlyOwner checkId(_expenseId) {
        expenses[_expenseId] = Expense(_expenseId, _description, _amount, _date);
        emit ExpenseUpdate(_expenseId, _description, _amount, _date);
    }

    function getAllExpenses() public view returns(Expense[] memory){
        Expense[] memory expenseList = new Expense[](expenseId - 1);
        for(uint i = 0; i < expenseId - 1; i++){
            expenseList[i] = expenses[i + 1];
        }
        return expenseList;
    }

    function viewExpense(uint _expenseId) public view checkId(_expenseId) returns(Expense memory){
        return expenses[_expenseId];
    }

   function getExpenseById(uint _expenseId) public view checkId(_expenseId) returns(Expense memory){
        return expenses[_expenseId];
    }
    
    function deleteExpense(uint _expenseId) public onlyOwner checkId(_expenseId) {
        delete expenses[_expenseId];
        emit ExpenseDelete(_expenseId);
    }
}
