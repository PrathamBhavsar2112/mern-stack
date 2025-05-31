import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onDelete, onView }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>{product.price}</strong></Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="info" size="sm" onClick={() => onView(product)}>
            View
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
