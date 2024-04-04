import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './assects/logo.png';
import { Link } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [bagItems, setBagItems] = useState([]);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      getBagItems();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const getBagItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user_bag_get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBagItems(res.data);
    } catch (error) {
      console.error('Error fetching bag items:', error);
      // Optionally, you can show a message to the user indicating the error
    }
  };

  const removeFromBag = async (productId) => {
    try {
      await axios.post(
        'http://localhost:5000/user_bag_remove',
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getBagItems(); // Refresh bag items after removing
    } catch (error) {
      console.error('Error removing product from bag:', error);
      // Optionally, you can show a message to the user indicating the error
    }
  };

  return (
    <div>
      <div>
        {bagItems.map((item) => (
          <div key={item.product_id}>
            <p>Color: {item.color}</p>
            <p>Size: {item.size}</p>
            <img src={item.image_url} alt="Product"></img>
            <button onClick={() => removeFromBag(item.product_id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
