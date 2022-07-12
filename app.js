const express = require("express");
const {
  getAllBankAccounts,
  getOneAccount,
  saveBankAccount,
  updateAccount,
  deleteAccount,
} = require("./accountController");
const account = require("./account");
const app = express();
const port = 4040;

app.use(express.json());

app.post("/addAccount", (req, res) => {
  try {
    const { id, name, age } = req.body;
    if (!id && !name && !age)
      throw new Error("check if you provide id name and age of a customer.");

    let newAccount = new account(id, name, age);

    saveBankAccount(newAccount);
    res.status(200).json({ Message: "account created successfully" });
  } catch (error) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("welcome to this bank services");
});

app.get("/account", (req, res) => {
  try {
    let result = getAllBankAccounts();
    if (!result) throw new Error("No accounts found.");
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

app.get("/account/:id", (req, res) => {
  try {
    let id = req.params.id;
    if (!id) throw new Error("Please provide id.");
    let result = getOneAccount(Number(id));
    if (!result) throw new Error("No account found.");
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

app.patch("/account", (req, res) => {
  try {
    const { id, balance } = req.body;
    if (!id) throw new Error("Please provide id.");
    if (!balance) throw new Error("Please provide balance");
    let result = updateAccount(id, balance);
    if (!result) throw new Error("Account not found");
    res.status(200).json({ Message: "Updated account balance" });
  } catch (error) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

app.delete("/account", (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Please provide id.");
    let result = deleteAccount(id);
    if (!result) throw new Error("Account not found");
    res.status(200).json({ Message: "Deleted account" });
  } catch (error) {
    res.status(401).json({
      Error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
