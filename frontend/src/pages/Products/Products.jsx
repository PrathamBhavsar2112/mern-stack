import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [status, setStatus] = useState(null); // For success/error messages

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Enter a valid URL').required('Image URL is required'),
    price: Yup.string().required('Price is required'),
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      setStatus({ error: `Failed to fetch products: ${error.message}` });
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (values, { setSubmitting, setStatus }) => {
    try {
      const payload = { ...values, price: Number(values.price) }; // Convert price to number
      const res = await axios.post(API_URL, payload);
      setProducts([res.data, ...products]);
      setShowAddModal(false);
      setStatus({ success: 'Product added successfully!' });
    } catch (error) {
      setStatus({ error: `Failed to add product: ${error.message}` });
      console.error('Error adding product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    console.log('Deleting product with ID:', id); // Debug log
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter(p => p._id !== id));
      setStatus({ success: 'Product deleted successfully!' });
    } catch (error) {
      setStatus({ error: `Failed to delete product: ${error.message}` });
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const payload = { ...values, price: Number(values.price) }; // Convert price to number
      const res = await axios.put(`${API_URL}/${selectedProduct._id}`, payload);
      const updated = products.map(p => p._id === selectedProduct._id ? res.data : p);
      setProducts(updated);
      setShowEditModal(false);
      setStatus({ success: 'Product updated successfully!' });
    } catch (error) {
      setStatus({ error: `Failed to update product: ${error.message}` });
      console.error('Error updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product List</h2>
          <Button variant="success" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
        </div>

        {status?.error && <Alert variant="danger">{status.error}</Alert>}
        {products.length === 0 ? (
          <p className="text-center text-muted">No products available.</p>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onDelete={handleDelete}
                  onView={handleView}
                  onEdit={handleEdit}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add New Product</Modal.Title></Modal.Header>
        <Formik
          initialValues={{ name: '', description: '', image: '', price: '' }}
          validationSchema={productSchema}
          onSubmit={async (values, actions) => {
            await handleAdd(values, actions);
            actions.resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, status }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {status?.success && <Alert variant="success">{status.success}</Alert>}
              {status?.error && <Alert variant="danger">{status.error}</Alert>}
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={values.name} onChange={handleChange} isInvalid={touched.name && !!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="description" value={values.description} onChange={handleChange} isInvalid={touched.description && !!errors.description} />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" value={values.image} onChange={handleChange} isInvalid={touched.image && !!errors.image} />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" value={values.price} onChange={handleChange} isInvalid={touched.price && !!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Product</Modal.Title></Modal.Header>
        <Formik
          initialValues={selectedProduct || { name: '', description: '', image: '', price: '' }}
          enableReinitialize
          validationSchema={productSchema}
          onSubmit={async (values, actions) => {
            await handleEditSubmit(values, actions);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, status }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {status?.success && <Alert variant="success">{status.success}</Alert>}
              {status?.error && <Alert variant="danger">{status.error}</Alert>}
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={values.name} onChange={handleChange} isInvalid={touched.name && !!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" value={values.image} onChange={handleChange} isInvalid={touched.image && !!errors.image} />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" value={values.price} onChange={handleChange} isInvalid={touched.price && !!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Product'}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton><Modal.Title>{selectedProduct?.name}</Modal.Title></Modal.Header>
        <Modal.Body>
          <img src={selectedProduct?.image} alt={selectedProduct?.name} className="img-fluid mb-3" />
          <p>{selectedProduct?.description}</p>
          <p><strong>Price:</strong> {selectedProduct?.price}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;