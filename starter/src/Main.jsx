import './App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import { useBooks } from './BooksContext';

export default function Main() {
  const { books } = useBooks();
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);

  useEffect(() => {
    setCurrentlyReadingBooks(books.filter((book) => book.shelf === 'currentlyReading'));
    setWantToReadBooks(books.filter((book) => book.shelf === 'wantToRead'));
    setFinishedBooks(books.filter((book) => book.shelf === 'read'));
  }, [books]);

  return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" books={currentlyReadingBooks} />
            <Bookshelf title="Want to Read" books={wantToReadBooks} />
            <Bookshelf title="Finished Books" books={finishedBooks} />
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
  );
}