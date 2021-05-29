function findAuthorById (authors, id) {
  // find()
  return authors.find (author => author.id === id);
}

function findBookById (books, id) {
  return books.find (book => book.id === id);
}

function partitionBooksByBorrowedStatus (books) {
  let returned = [];
  let notReturned = [];
  let allBooks = [];
  books.filter (book => {
    if (book.borrows[0].returned === false) {
      notReturned.push (book);
    }
    if (book.borrows[0].returned === true) {
      returned.push (book);
    }
  });
  allBooks.push (notReturned, returned);
  return allBooks;
}

function getBorrowersForBook (book, accounts) {
  let result = [];
  book.borrows.filter (book => {
    accounts.forEach (account => {
      if (book.id === account.id) {
        account.returned = book.returned;
        result.push (account);
      }
    });
  });
  result.length = 10;
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
