import "./App.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {getAll, update} from "./BooksAPI"
function Main() {
  const [updated, setUpdated] = useState(false);
  const [books, setBooks] = useState([])
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([])
  const [wantToReadBooks, setWantToReadBooks] = useState([])
  const [finishedBooks, setFinishedBooks] = useState([])
  useEffect(() => {
    async function fetchData() {
      const allBooks = await getAll();
      setBooks(allBooks);
    }
    fetchData();
  }, [updated]);

  useEffect(() => {
    setCurrentlyReadingBooks(books.filter(book => book.shelf === "currentlyReading"));
    setWantToReadBooks(books.filter(book => book.shelf === "wantToRead"));
    setFinishedBooks(books.filter(book => book.shelf === "read"));
  }, [books]);
  return (
      <div className={"app"}>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.map((book) => (
                      <li key={book.id} className={book.id}>
                        <div>
                          <div className="book">
                            <div className="book-top">
                              <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                        `url(${book.imageLinks.thumbnail})`,
                                  }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select onChange={e => {
                                  book.shelf = e.currentTarget.value
                                  setCurrentlyReadingBooks(currentlyReadingBooks.filter(value => value.id !== book.id))
                                  switch (e.currentTarget.value) {
                                    case "wantToRead":
                                      setWantToReadBooks(wantToReadBooks.concat(book));
                                      break;
                                    case "read":
                                      setFinishedBooks(finishedBooks.concat(book));
                                  }
                                  update(book, e.currentTarget.value).then(() => setUpdated(!updated))
                                }} defaultValue={"currentlyReading"}>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently
                                    Reading {book.shelf === "currentlyReading" && " •"}</option>
                                  <option value="wantToRead">Want to Read {book.shelf === "wantToRead" && " •"}</option>
                                  <option value="read">Read {book.shelf === "read" && " •"}</option>
                                  <option value="none">None {book.shelf === "none" && " •"}</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.map(author => <span
                                key={book.title.concat(author)} className={"book-author"}>{author}</span>)}</div>
                          </div>
                        </div>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.map((book) => (
                      <li key={book.id} className={book.id}>
                        <div>
                          <div className="book">
                            <div className="book-top">
                              <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                  }}
                              ></div>
                              <div className="book-shelf-changer">
                                <select onChange={e => {
                                  setWantToReadBooks(wantToReadBooks.filter(value => value.id !== book.id));
                                  book.shelf = e.currentTarget.value
                                  switch (e.currentTarget.value) {
                                    case "currentlyReading":
                                      setCurrentlyReadingBooks(currentlyReadingBooks.concat(book));
                                      break;
                                    case "read":
                                      setFinishedBooks(finishedBooks.concat(book));
                                  }
                                  update(book, e.currentTarget.value).then(() => {
                                    setUpdated(!updated)});
                                }} defaultValue={"wantToRead"}>
                                  <option value="none" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently
                                    Reading {book.shelf === "currentlyReading" && " •"}</option>
                                  <option value="wantToRead">Want to Read {book.shelf === "wantToRead" && " •"}</option>
                                  <option value="read">Read {book.shelf === "read" && " •"}</option>
                                  <option value="none">None {book.shelf === "none" && " •"}</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.map(author => <span
                                key={book.title.concat(author)} className={"book-author"}>{author}</span>)}</div>
                          </div>
                        </div>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Finished Books</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {finishedBooks.map((book) => (
                      <li key={book.id} className={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                }}
                            ></div>
                            <div className="book-shelf-changer">
                              <select onChange={e => {
                                book.shelf = e.currentTarget.value
                                setFinishedBooks(finishedBooks.filter(value => value.id !== book.id))
                                switch (e.currentTarget.value) {
                                  case "wantToRead":
                                    setWantToReadBooks(wantToReadBooks.concat(book));
                                    break;
                                  case "currentlyReading":
                                    setCurrentlyReadingBooks(currentlyReadingBooks.concat(book));
                                }
                                update(book, e.currentTarget.value).then(() => setUpdated(!updated))
                              }} defaultValue={"read"}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently
                                  Reading {book.shelf === "currentlyReading" && " •"}</option>
                                <option value="wantToRead">Want to Read {book.shelf === "wantToRead" && " •"}</option>
                                <option value="read">Read {book.shelf === "read" && " •"}</option>
                                <option value="none">None {book.shelf === "none" && " •"}</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.map(author => <span
                              key={book.title.concat(author)} className={"book-author"}>{author}</span>)}</div>
                        </div>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to={"/search"}>Add a book</Link>
          </div>
        </div>
</div>
)
}

export default Main;
