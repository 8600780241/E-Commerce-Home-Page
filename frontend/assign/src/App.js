import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Home';
import Cart from './Component/Cart';
import AddProduct from './Component/Addproduct';
import EditProduct from './Component/Editproduct';
import DeleteProduct from './Component/Deleteproduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/editproduct' element={<EditProduct />} />
          <Route path='/deleteproduct' element={<DeleteProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
