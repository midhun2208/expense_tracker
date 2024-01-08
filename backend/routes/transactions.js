const { addExpense, getExpense, deteleExpense, editExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deteleIncome, editIncome } = require('../controllers/income')
const { loginController, registerController } = require('../controllers/userController')

const router = require('express').Router()

// income 
router.post('/add-income', addIncome)
router.post('/get-incomes', getIncomes)
router.delete('/delete-income/:id',deteleIncome)
router.post('/edit-incomes', editIncome)

//expense
router.post('/add-expense', addExpense)
router.post('/get-expenses', getExpense)
router.delete('/delete-expense/:id',deteleExpense)
router.post('/edit-expenses', editExpense)

//user routes
router.post('/login',loginController)

//POST || Register
router.post('/register',registerController)

module.exports = router