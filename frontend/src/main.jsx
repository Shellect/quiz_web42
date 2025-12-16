import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import './assets/style.scss';
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Quiz from "./pages/Quiz";

const root = createRoot(document.querySelector('.root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Quiz/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
