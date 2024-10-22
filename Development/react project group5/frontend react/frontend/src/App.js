import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Help from './components/Help';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import Notes from './components/Notes';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound'; // Ensure this is created
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="app-container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/help' element={<Help />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route 
                        path='/dashboard' 
                        element={<PrivateRoute element={<Dashboard setIsLoggedIn={setIsLoggedIn} />} isLoggedIn={isLoggedIn} />} 
                    />
                    <Route 
                        path='/notes' 
                        element={<PrivateRoute element={<Notes isLoggedIn={isLoggedIn} />} isLoggedIn={isLoggedIn} />} 
                    />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
                </Routes>
                <Carousel />
            </div>
            <Footer />
        </Router>
    );
};

export default App;