import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../src/components/Login';
import AllProduct from '../src/components/AllProduct';
import AddProduct from '../src/components/AddProduct';
import Search from './components/Search';
import AddCategory from './components/AddCategory';
import UpdateProduct from './components/EditProduct';
import Register from './components/Register';
import Category from './components/category';
import OTPscreen from './components/OtpScreen';
import SendOTPEmail from './components/sendOTPEmail';
import ForgatePass from './components/forgatePass';
import AddPost from './components/addPost';
import AllPost from './components/allPost';
import AddComment from './components/addComent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/allProducts" element={<AllProduct />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/addComment/:id" element={<AddComment />} />
      <Route path="/allPost" element={<AllPost />} />
      <Route path="/search" element={<Search />} />
      <Route path="/addCategory" element={<AddCategory />} />
      <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path='/allCategory' element={<Category/>}/>
      <Route path='/addCategory' element={<AddCategory/>}/>
      <Route path='/otp' element={<OTPscreen/>}/>
      <Route path='/sendOTP' element={<SendOTPEmail/>}/>
      <Route path='/updatePass' element={<ForgatePass/>}/>
      
    </Routes>
  );
}

export default App; 