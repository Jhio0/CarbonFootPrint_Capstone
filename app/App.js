import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./messageboard/Register";
import Login from "./src/pages/logIn";
import Home from "./messageboard/Home";
import Replies from "./messageboard/Replies";
import NoPage from "./pages/NoPage";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* <Route index element ={<Home/>} /> - Do I need this? */}
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/:id/replies' element={<Replies />} />
                    {/* Handle 404 */}
                    <Route path= "*" element={<NoPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;