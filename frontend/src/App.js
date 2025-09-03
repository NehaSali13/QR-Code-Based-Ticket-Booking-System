// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminLogin from './pages/Admin/AdminLogin';
import StaffLogin from './pages/Staff/StaffLogin';
import UserLogin from './pages/User/Login';

import StaffDashboard from './pages/Staff/StaffDashboard';
import UserDashboard from './pages/User/UserDashboard';
import BookTicket from './pages/User/BookTicket';
import MyTickets from './pages/User/MyTickets';
import Register from './pages/Authentication/Register';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Location from './pages/Location/Location';
import Navbar from './components/Navbar/Navbar';
import MoreInfo from './pages/User/MoreInfo';

import PayOnline from './pages/User/PayOnline';

import Scanner from './pages/Staff/Scanner';
import SearchId from './pages/Staff/SearchId';


import AdminDashboard from './pages/Admin/AdminDashboard';
import ViewUsers from './pages/Admin/ViewUsers';
import ViewStaff from './pages/Admin/ViewStaff';
import ViewBookings from './pages/Admin/ViewBookings';

import AddStaff from './pages/Admin/AddStaff';
import DeleteStaff from './pages/Admin/DeleteStaff';



const AppWrapper = () => {
  const location = useLocation();

  // These routes should NOT show the navbar
  const hideNavbarPaths = [
    '/user/dashboard',
    '/admin/dashboard',
    '/staff/dashboard',
    '/book-ticket',
    '/my-tickets'
  ];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* 🌐 Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />

        {/* 🔐 Authentication Pages */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/logout" element={<Logout />} />
           


        {/* 📊 Protected Dashboards */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute><UserDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/staff/dashboard" element={
          <ProtectedRoute><StaffDashboard /></ProtectedRoute>
        } />

        {/* 🎫 User Protected Pages */}
        <Route path="/book-ticket" element={
          <ProtectedRoute><BookTicket /></ProtectedRoute>
        } />
        <Route path="/my-tickets" element={
          <ProtectedRoute><MyTickets /></ProtectedRoute>
        } />
        
          <Route path="/more-info" element={<ProtectedRoute><MoreInfo /></ProtectedRoute>
        } />
         
          
          
          
            <Route path="/pay-online/:ticketId" element={
             <ProtectedRoute><PayOnline /></ProtectedRoute>
        } />
        

             <Route path="/staff/scan" element={<Scanner />
            } />
                <Route path="/staff/search" element={<SearchId />
              } />

           <Route path="/admin/users" element={<ViewUsers />
           } />

         <Route path="/admin/staff" element={<ViewStaff />} />
        <Route path="/admin/bookings" element={<ViewBookings />} />
     
        <Route path="/admin/add-staff" element={<AddStaff />} />
        <Route path="/admin/view-users" element={<ViewUsers />} />
        <Route path="/admin/view-staff" element={<ViewStaff />} />
          <Route path="/admin/delete-staff" element={<DeleteStaff />} />


      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
