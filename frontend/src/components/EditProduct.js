import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProduct = () => {

  const navigate = useNavigate();
  const {id} = useParams();

  const token = localStorage.getItem('accessToken');
  // const bookId = localStorage.getItem('accessBookId');

 

  const [productData, setproductData] = useState({});

  useEffect(() => {
    const fetchproductData = async () => {
  
      try {
        const response = await fetch(`http://localhost:5000/api/productById/${id}`, {
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        setproductData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchproductData();
  }, [id]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductData({ ...productData, [name]: value });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `http://localhost:5000/api/updateProduct/${productData.id}`, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response.data);
          navigate('/allProducts');
        } else {
          console.error('Error updating product:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('Error updating product:', xhr.statusText);
      };

      xhr.send(JSON.stringify(productData));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Update product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID  
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id"
              value={productData.id || ''} 
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={productData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={productData.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">category Id</label>
            <input type="text" className="form-control" id="categoryId" name="categoryId" value={productData.categoryId} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">price</label>
            <input type="text" className="form-control" id="price" name="price" value={productData.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="author_id" className="form-label">images</label>
            <input type="text" className="form-control" id="author_id" name="author_id" value={productData.images} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="createdBy" className="form-label">created By</label>
            <input type="text" className="form-control" id="createdBy" name="createdBy" value={productData.createdBy } onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;

