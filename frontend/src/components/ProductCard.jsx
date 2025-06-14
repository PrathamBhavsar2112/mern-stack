import React from 'react';
import './ProductCard.css';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onDelete, onView, onEdit }) => {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>{product.price}</strong></Card.Text>
        <div className="product-buttons">
          <Button variant="info" size="sm" onClick={() => onView(product)}>
            View
          </Button>
          <Button variant="warning" size="sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(product._id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;