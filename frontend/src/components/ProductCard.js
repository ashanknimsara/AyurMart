import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "../assets/styles/productcard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-details">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
