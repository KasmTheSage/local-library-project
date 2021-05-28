const {findAuthorById} = require ('./books');

function getTotalBooksCount (books) {
  let accumulator = 0;
  books.forEach (book => accumulator++);
  return accumulator;
}

function getTotalAccountsCount (accounts) {
  let accumulator = 0;
  accounts.forEach (account => accumulator++);
  return accumulator;
}

function getBooksBorrowedCount (books) {
  let counter = 0;
  books.filter (book => {
    if (book.borrows[0].returned === false) {
      counter++;
    }
  });
  return counter;
}

function getMostCommonGenres (books) {
  let genres = books.map (book => book.genre);
  console.log (genres);
  let genreCount = genres.reduce ((total, genre) => {
    if (total[genre]) {
      total[genre]++;
    } else {
      total[genre] = 1;
    }
    return total;
  }, {});
  let result = [];
  for (let name in genreCount) {
    result.push ({
      name: name,
      count: genreCount[name],
    });
  }
  result.sort ((resultA, resultB) => (resultA.count > resultB.count ? -1 : 1));

  return result.slice(0, 5);
}

function getMostPopularBooks (books) {
  let result = [];
  books.forEach (book => {
    result.push ({
      name: book.title,
      count: book.borrows.length,
    });
  });
  result.sort ((indexA, indexB) => (indexA.count > indexB.count ? -1 : 1));
  return result.slice(0, 5);
}

function getMostPopularAuthors (books, authors) {
  const bookAuthors = [];
  books.forEach (book => {
    const match = bookAuthors.find (author => author.id === book.authorId);
    if (match) {
      match.count += book.borrows.length;
    } else {
      const writer = findAuthorById (authors, book.authorId);
      const count = book.borrows.length;
      bookAuthors.push ({
        name: `${writer.name.first} ${writer.name.last}`,
        count,
      });
    }
  });
  let result = bookAuthors.sort (
    (authorA, authorB) => (authorA.count < authorB.count ? 1 : -1)
  );
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
