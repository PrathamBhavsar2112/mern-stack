import React from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, 'Phone must be 10 to 15 digits')
      .required('Phone is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting, setStatus }) => {
    try {
      // Optional: Uncomment and configure API_URL for backend integration
      // const API_URL = 'http://localhost:5001/api/register';
      // await axios.post(API_URL, values);
      console.log('Form submitted:', values);
      setStatus({ success: 'Registration successful!' });
      resetForm();
    } catch (error) {
      setStatus({ error: 'Registration failed. Please try again.' });
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, status }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {status?.success && <Alert variant="success">{status.success}</Alert>}
            {status?.error && <Alert variant="danger">{status.error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                isInvalid={touched.fullName && !!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={values.phone}
                onChange={handleChange}
                isInvalid={touched.phone && !!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;