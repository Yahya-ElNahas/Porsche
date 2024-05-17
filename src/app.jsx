import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Load from './pages/load.jsx'
import Index from './pages/index.jsx'
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Home from './pages/home.jsx'
import AdminHome from './pages/adminHome.jsx'
import AddProduct from './pages/addProduct.jsx'
import AlterProduct from './pages/alterProduct.jsx'
import DeleteProduct from './pages/deleteProduct.jsx'
import ManageCustomers from './pages/manageCustomers.jsx'
import DeleteCustomer from './pages/deleteCustomer.jsx'
import EditUser from './pages/EditUser.jsx'
import Profile from './pages/profile.jsx'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Load/>}/>
                <Route path="/porsche" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin_home" element={<AdminHome/>}/>
                <Route path="/add_product" element={<AddProduct/>}/>
                <Route path="/alter_product" element={<AlterProduct/>}/>
                <Route path="/delete_product" element={<DeleteProduct/>}/>
                <Route path="/manage_customers" element={<ManageCustomers/>}/>
                <Route path="/delete_customer" element={<DeleteCustomer/>}/>
                <Route path="/EditUser" element={<EditUser/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    )
}

export default App
