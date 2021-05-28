const {findAuthorById} = require ('./books');

function findAccountById (accounts, id) {
  let result = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      result = accounts[i];
    }
  }
  return result;
}

function sortAccountsByLastName (accounts) {
  const result = accounts.sort (
    (accountsA, accountsB) =>
      accountsA.name.last < accountsB.name.last ? -1 : 1
  );
  return result;
}

function getTotalNumberOfBorrows (account, books) {
  let counter = 0;
  let borrowsArray = [];
  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;
    for (let j = 0; j < borrows.length; j++) {
      if (account.id === borrows[j].id) {
        counter++;
      }
    }
  }
  return counter;
}

function getBooksPossessedByAccount (account, books, authors) {
  const id = account.id;
  const booksUserHas = books.filter (
    book => !book.borrows[0].returned && book.borrows[0].id === id
  );
  booksUserHas.forEach (book => {
    book.author = findAuthorById (authors, book.authorId);
  });
  return booksUserHas;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
