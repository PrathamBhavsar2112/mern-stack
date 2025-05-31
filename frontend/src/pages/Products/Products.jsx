import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import sampleProductsData from '../../data/sampleProducts';

const Products = () => {
  const [products, setProducts] = useState(sampleProductsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
  });

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => {
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', image: '', price: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const id = Date.now();
    setProducts([{ ...newProduct, id }, ...products]);
    handleCloseAdd();
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product List</h2>
          <Button variant="success" onClick={handleShowAdd}>
            + Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted">No products available.</p>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onDelete={handleDeleteProduct}
                  onView={handleViewProduct}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                name="description"
                value={newProduct.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="url"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddProduct}
            disabled={
              !newProduct.name || !newProduct.description || !newProduct.image || !newProduct.price
            }
          >
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Product Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            className="img-fluid mb-3"
          />
          <p>{selectedProduct?.description}</p>
          <p><strong>Price: </strong>{selectedProduct?.price}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
