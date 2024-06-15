import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {getAll, search, update} from "./BooksAPI";
import "./App.css";

export const Search = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(async () => {
            if (query) {
                setLoading(true);
                const filter = await getAll()
                let results = await search(query)
                if (!Array.isArray(results)) setBooks([]);
                else {
                    results = results.map(value => {
                        const t = filter.find(it => it.id === value.id)
                        if (t != null)
                            return t
                        value.shelf = 'none'
                        return value;
                    })
                    setBooks(results);
                }
                setLoading(false);
            }
        }, 200)
        return () => {clearTimeout(timeOut)}
    }, [query])



    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {loading ? (
                        <div className="search-indicator">Searching...</div>
                    ) : books.length > 0 ? (
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id} className={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div
                                                className="book-cover"
                                                style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${book.imageLinks?.thumbnail})`,
                                                }}
                                            ></div>
                                            <div className="book-shelf-changer">
                                                <select
                                                    onChange={(e) => {
                                                        book.shelf = e.currentTarget.value
                                                        setBooks(books.map(value => value === book.id ? book : value))
                                                        update(book, e.currentTarget.value)
                                                    }}
                                                    value={book.shelf || "none"}>
                                                    {
                                                    }
                                                    <option defaultValue="moveTo" disabled>
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading {book.shelf === "currentlyReading" && " •"}
                                                    </option>
                                                    <option value="wantToRead">
                                                        Want to Read {book.shelf === "wantToRead" && " •"}
                                                    </option>
                                                    <option value="read">Read {book.shelf === "read" && " •"}</option>
                                                    <option value="none">None {book.shelf === "none" && " •"}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">
                                            {book.authors?.map((author) => (
                                                <span key={`${book.id}-${author}`} className="book-author">
                                                    {author}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : query.length > 0 && !loading ? (
                        <div className="search-indicator">No results found</div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
};
