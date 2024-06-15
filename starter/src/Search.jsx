import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { search } from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import {BooksContext, useBooks} from './BooksContext';

export default function Search() {
    const { books: existingBooks, handleUpdate } = useBooks();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(async () => {
            if (query) {
                setLoading(true);
                let results = await search(query);
                if (!Array.isArray(results)) {
                    setBooks([]);
                } else {
                    results = results.map((value) => {
                        const existingBook = existingBooks.find(book => book.id === value.id);
                        return existingBook ? existingBook : { ...value, shelf: 'none' };
                    });
                    setBooks(results);
                }
                setLoading(false);
            }
        }, 200);
        return () => {
            clearTimeout(timeOut);
        };
    }, [query]);

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
                        <BooksContext.Provider value={{ books, setUpdatedBooks: setBooks, handleUpdate, updateOrder: false }}>
                            <Bookshelf title="Search Results" books={books} />
                        </BooksContext.Provider>
                    ) : query.length > 0 && !loading ? (
                        <div className="search-indicator">No results found</div>
                    ) : ( <></>
                    )}
                </div>
            </div>
        </div>
    );
}