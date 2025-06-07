import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import sampleProductsData from '../../data/sampleProducts';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Products = () => {
  const [products, setProducts] = useState(sampleProductsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Enter a valid URL').required('Image URL is required'),
    price: Yup.string().required('Price is required'),
  });

  const handleAdd = (values) => {
    const id = Date.now();
    setProducts([{ ...values, id }, ...products]);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = (values) => {
    const updated = products.map(p =>
      p.id === selectedProduct.id ? { ...p, ...values } : p
    );
    setProducts(updated);
    setShowEditModal(false);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Product List</h2>
          <Button variant="success" onClick={() => setShowAddModal(true)}>+ Add Product</Button>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted">No products available.</p>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
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
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{ name: '', description: '', image: '', price: '' }}
          validationSchema={productSchema}
          onSubmit={(values, actions) => {
            handleAdd(values);
            actions.resetForm();
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
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
                <Button type="submit" variant="primary">Add Product</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={selectedProduct || { name: '', description: '', image: '', price: '' }}
          enableReinitialize
          validationSchema={productSchema}
          onSubmit={(values) => handleEditSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
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
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Update Product</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedProduct?.image} alt={selectedProduct?.name} className="img-fluid mb-3" />
          <p>{selectedProduct?.description}</p>
          <p><strong>Price: </strong>{selectedProduct?.price}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
