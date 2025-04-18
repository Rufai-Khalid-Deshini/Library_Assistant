import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from './pages/Notfound';
import Home from './pages/students/Home';
import Category from './pages/students/Category';
import Profile from './pages/students/Profile';
import Categories from './pages/students/Categories';
import Dashboard from './pages/librarian/Dashboard';
import AddBook from './pages/librarian/AddBook';
import ViewBook from './pages/students/ViewBook';
import ViewBooks from './pages/librarian/ViewBooks';
import PendingRequests from './pages/librarian/PendingRequests';
import OverdueBooks from './pages/librarian/OverdueBooks';
import BorrowedBooks from './pages/librarian/BorrowedBooks';
import Notifications from './pages/Notifications';
import SearchPage from './pages/SearchPage';

const Navigation = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Notfound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/students/categories" element={<Category />} />
            <Route path="/students/categories/:category" element={<Categories />} />
            <Route path="/students/search" element={<SearchPage />} />
            <Route path="/students/book/:id" element={<ViewBook />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard/add-book" element={<AddBook />} />
            <Route path="/admin/dashboard/all-books" element={<ViewBooks />} />
            <Route path="/admin/dashboard/pending-requests" element={<PendingRequests />} />
            <Route path="/admin/dashboard/overdue-books" element={<OverdueBooks />} />
            <Route path="/admin/dashboard/borrowed-books" element={<BorrowedBooks />} />
        </Routes>
    </BrowserRouter>
    )
}

export default Navigation