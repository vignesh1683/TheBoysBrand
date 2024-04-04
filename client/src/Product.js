import React, { useState } from 'react';
import axios from 'axios';

const Product = ({ product, closeModal }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleAddToBag = async () => {
    // Implement your logic to add the selected product to the shopping bag
    console.log('Product added to bag:', product);
    closeModal();
  };

  const handleMoreDetails = () => {
    // Implement your logic to show more details about the product
    console.log('More details clicked:', product);
  };

  return (
    <div className="modal">
      <span className="close" onClick={closeModal}>&times;</span>
      <div className="modal-content">
        {/* Product images */}
        {/* Replace ``${`${product.image}`}`` with the actual URL of your product images */}
        <img src={`${product.image}`} alt="product" className="model-main-img" />
        {/* Product details */}
        <div className="modal-detail">
          <h2>{product.name}</h2>
          <h3>{product.category}</h3>
          <h5>SKU#: {product.sku}</h5>
          {/* Available colors */}
          <div className="mcolor">
            <h4>Available Colors</h4>
            <div className="color-box">
              {/* Map through product colors and render color circles */}
              {product.colors.map((color, index) => (
                <div className="circle-container" key={index}>
                  <div className={`circles ${color}`} onClick={() => setSelectedColor(color)}></div>
                  <div className="color-name">{color}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Available sizes */}
          <div className="size">
            <h4>Available Sizes</h4>
            <div className="circle-container">
              {/* Map through product sizes and render size circles */}
              {product.sizes.map((size, index) => (
                <div className={`circles ${selectedSize === size ? 'selected' : ''}`} key={index} onClick={() => setSelectedSize(size)}>{size}</div>
              ))}
            </div>
          </div>
          {/* Product price */}
          <div className="details">
            <p className="price-details">
              <span>RS.{product.price}</span>
              {/* Assuming you have a discounted price */}
              <span className="discounted-price">RS.2500</span>80%
            </p>
            {/* Buttons */}
            <div className="button-container">
              {/* Add to Bag button */}
              <button className="button add-to-bag" onClick={handleAddToBag}>Add to Bag</button>
              {/* More Details button */}
              <button className="button more-details" onClick={handleMoreDetails}>More Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
