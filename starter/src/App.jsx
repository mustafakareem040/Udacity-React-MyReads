import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Main from "./Main";
import {Search} from "./Search";

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/search"} exact element={<Search/>} />
        </Routes>
    </BrowserRouter>
    )
}
