import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Search from './Search';
import { BooksProvider } from './BooksContext';

export default function App() {
    return (
        <BrowserRouter>
            <BooksProvider>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BooksProvider>
        </BrowserRouter>
    );
}