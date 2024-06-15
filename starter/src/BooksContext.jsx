import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAll, update } from './BooksAPI';

export const BooksContext = createContext({});

export function BooksProvider({ children }) {
    const [allBooks, setAllBooks] = useState([]);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const allBooks = await getAll();
            setAllBooks(allBooks);
        }
        fetchData();
    }, [updated]);

    const handleUpdate = (books, updatedBook, newShelf, setUpdatedBooks, updateOrder = true) => {
        let updatedBooks;
        if (updateOrder) {
            updatedBooks = books.filter(book => book.id !== updatedBook.id);
            updatedBooks.push({...updatedBook, shelf: newShelf});
        }
        else {
            updatedBooks = books.map(book => book.id === updatedBook.id ? { ...book, shelf: newShelf } : book);
        }
        setUpdatedBooks(updatedBooks);
        update(updatedBook, newShelf).then(() => {
            setUpdated(!updated);
        }).catch(() => {
            // TODO handle error
        });
    };

    return (
        <BooksContext.Provider value={{ books: allBooks, handleUpdate, setUpdatedBooks: setAllBooks }}>
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks() {
    return useContext(BooksContext);
}