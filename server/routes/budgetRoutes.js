const express = require("express");

const {
  getExpenses,
  editExpense,
  deleteExpense,
  addExpense,
  updateBudget,
  getBudgetAndExpenses,
} = require("../controllers/BudgetController.js");

const router = express.Router();

// Budget Routes
router.route("/updateBudget").post(updateBudget);
router.route("/addExpense").post(addExpense);
router.route("/getBudgetAndExpenses").get(getBudgetAndExpenses);
router.route("/deleteExpense").delete(deleteExpense);
router.route("/editExpense").put(editExpense);
router.get("/getExpenses", getExpenses);


module.exports = router;
