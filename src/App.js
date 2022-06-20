// import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Categories from './Components/Categories/Categories';
import Todos from './Components/Todos/Todos';
import NotFound from './Components/NotFound';
import Navigation from './Components/Navigation';
import AuthProvider from './Contexts/AuthContext';
import Login from './Components/Auth/Login';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home/Home';


export default function App() {
  return (
    <div className="App">
      <AuthProvider>
    <Router>
      
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
        <Route path='/todos' element={<ProtectedRoute><Todos/></ProtectedRoute>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer/>
    </Router>
    </AuthProvider>
    </div>
  )
}
