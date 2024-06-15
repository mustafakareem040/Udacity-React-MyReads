import React from "react";
import {useBooks} from "./BooksContext";

export default function Book({ book }) {
    const {books, handleUpdate, setUpdatedBooks, updateOrder=true} = useBooks();
    const handleChange = (event) => {
        const newShelf = event.target.value;
        handleUpdate(books, book, newShelf, setUpdatedBooks, updateOrder)}
    return (
        <li>
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
                        <select defaultValue={book.shelf} onChange={handleChange}>
                            <option value="move" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading {book.shelf === "currentlyReading" && " •"}</option>
                            <option value="wantToRead">Want to Read {book.shelf === "wantToRead" && " •"}</option>
                            <option value="read">Read {book.shelf === "read" && " •"}</option>
                            <option value="none">None {book.shelf === "none" && " •"}</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors?.join(", ")}</div>
            </div>
        </li>
    );
}
