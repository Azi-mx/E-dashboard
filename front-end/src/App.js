import Nav from "./components/Nav";
import './App.css';
import Footer from './components/Footer';
import Signup from './components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
      // Whatever you want to be in private component than just wrap all this component in PrivateComponentin
          <Route element={<PrivateComponent />} >
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1> Logout Product Component</h1>} />
            <Route path="/profile" element={<h1> Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
