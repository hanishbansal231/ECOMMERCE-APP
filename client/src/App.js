import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './pages/Auth/PrivateRoute';
import ResetPassword from './pages/Auth/ResetPassword';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import AdminDetails from './pages/Admin/AdminDetails';
import Setting from './pages/Admin/Setting';
import CreateCategory from './pages/Admin/CreateCategory';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password/:resetToken' element={<ForgotPassword />} />

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } >
          <Route path='admin' element={<AdminDashboard />} >
            <Route path='profile'  element={<AdminDetails />} />
            <Route path='setting'  element={<Setting />} />
            <Route path='create-category'  element={<CreateCategory />} />
          </Route>
        </Route>
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } >
          <Route path='user' element={<UserDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
