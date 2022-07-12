let bankAccounts = [];

function getAllBankAccounts() {
  return bankAccounts;
}

function getOneAccount(id) {
  for (let i of bankAccounts) {
    if (i.id == id) {
      return i;
    }
  }
  return false;
}

function saveBankAccount(account) {
  bankAccounts.push(account);
}

function updateAccount(id, newBalance) {
  console.log(id, newBalance);
  for (let account of bankAccounts) {
    if (account.id == id) {
      account.balance += newBalance;
      return true;
    }
  }
  return false;
}

function deleteAccount(id) {
  let found = false;
  for (let account of bankAccounts) {
    if (account.id == id) {
      found = true;
    }
  }
  if (bankAccounts.length > 0 && found) {
    bankAccounts = bankAccounts.filter((account) => account.id != id);
    return true;
  }
  return found;
}

module.exports = {
  getAllBankAccounts,
  getOneAccount,
  saveBankAccount,
  updateAccount,
  deleteAccount,
};
