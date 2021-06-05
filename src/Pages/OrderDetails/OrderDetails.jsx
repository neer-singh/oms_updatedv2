import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import { ORDER } from '../../assets/Json/ORDER';

import * as yup from 'yup';
import './OrderDetails.css';
let validationSchema = yup.object().shape({
  recipt: yup.number().required('Required'),
  transporter: yup.string().required('Required').min(3),
  date: yup.string().required('Required').min(3),
});
const initialValues = {
  recipt: '',
  transporter: '',
  date: '',
};
const OrderDetails = () => {
  const [createModel, setcreateModel] = useState(false);
  let param = useParams();
  const i = parseInt(param.id);
  const data = ORDER[i];
  const onSubmit = (props) => {
    console.log(props);
  };
  const toggle = () => setcreateModel(!createModel);
  const closeIcon = (
    <FontAwesomeIcon
      onClick={toggle}
      className='model_close_btn'
      icon={faTimes}
    />
  );
  return (
    <Container>
      <h4 className='pt-4 pb-4'>Order Details</h4>
      <div className='cardDetials'>
        <h4 className='text-light p-3 distributorHeading'>
          {data.distributor}
        </h4>
        <Row className='px-3'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Order ID
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={6}
            xl={6}
            className='pb-1 text-light column2'>
            : {data.id}
          </Col>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Total Item
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={2}
            xl={2}
            className='pb-1 text-light column2'>
            : {data.totalItem}
          </Col>
        </Row>
        <Row className='px-3'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Order Date
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={6}
            xl={6}
            className='pb-1 text-light column2-'>
            : {data.date}
          </Col>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Amount
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={2}
            xl={2}
            className='pb-1 text-light column2'>
            : {data.amount}
          </Col>
        </Row>
        <Row className='px-3 pb-4'>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Address
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={6}
            xl={6}
            className='pb-1 text-light column2-'>
            : {data.address}
          </Col>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            className='pb-1 text-light column1'>
            Status
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={2}
            xl={2}
            className='pb-1 text-light column2'>
            : {data.status}
          </Col>
        </Row>
      </div>
      <div className='tableDiv mt-5 mb-3'>
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.item}</td>
                  <td>{data.size}</td>
                  <td>{data.quantity}</td>
                  <td>{data.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className='d-flex w-100 justify-content-end'>
        <Button color='danger' className='mr-3 mb-3'>
          Cancel
        </Button>
        <Button className='mb-3' onClick={toggle}>
          Order Dispatch
        </Button>
      </div>
      <Modal isOpen={createModel} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeIcon}></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Dispatch Order</h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            isInitialValid={() => validationSchema.isValidSync(initialValues)}>
            {({
              values,
              touched,
              errors,
              isValid,
              handleChange,
              handleBlur,
              setFieldValue,
              dirty,
            }) => (
              <>
                <Form className='form'>
                  <FormGroup>
                    <Label for='Distributor'>Receipt Number</Label>
                    <FastField
                      as={Input}
                      name='recipt'
                      value={values.recipt}
                      onChange={handleChange}
                      invalid={touched.recipt && errors.recipt}
                      valid={dirty && !errors.recipt}
                    />
                    <FormFeedback>Enter a valid recipt number</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Transporter Name'>Transporter Name</Label>
                    <FastField
                      as={Input}
                      name='transporter'
                      value={values.transporter}
                      onChange={handleChange}
                      invalid={touched.transporter && errors.transporter}
                      valid={dirty && !errors.transporter}
                    />
                    <FormFeedback>Enter a valid transporter name</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='date'>Date</Label>
                    <FastField
                      as={Input}
                      type='date'
                      name='date'
                      value={values.date}
                      onChange={handleChange}
                      invalid={touched.date && errors.date}
                      valid={dirty && !errors.date}
                    />
                    <FormFeedback>Enter a valid date</FormFeedback>
                  </FormGroup>
                  <Button
                    type='submit'
                    className='w-100 mt-3'
                    color='secondary'
                    disabled={!dirty || !isValid}>
                    Save
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default OrderDetails;
