import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ErrorMessage, FastField, Formik, getIn } from 'formik';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import * as yup from 'yup';
import 'yup-phone';
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardDeck,
  CardGroup,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import './Profile.css';
const validationSchema = yup.object().shape({
  name: yup.string().required('*Required').min(3),
  city: yup.string('Enter a Valid City').required('*Required'),
  contact: yup.string().phone('India').required('*Required'),
  dealerPhone: yup.string().phone('India').required('*Required'),
  state: yup.string().required('*Required'),
  dealerMail: yup.string().email('Enter a valid email').required('*Required'),
  address: yup.string('Enter a Valid Address').required('*Required'),
  accountNumber: yup.number('Enter Valid Account Number').required('*Required'),
  upi: yup.string().required('*Required'),
  bankName: yup.string('Enter a Valid Bank Name').required('*Required'),
  cardNumber: yup
    .number('Enter Valid Card Number')
    .typeError('Numbers Only')
    .required('*Required'),
  shopArea: yup
    .number('Numbers only')
    .typeError('Numbers Only')
    .required('*Required'),
  shopNature: yup.string('Enter a Valid Shop Nature').required('*Required'),
  godownArea: yup.number('Number only').required('*Required'),
  ownerName: yup.string('Enter a Valid Name').required('*Required'),
  myManager: yup.string('Enter a Valid Manager Name').required('*Required'),
  promoter: yup.string('Enter a Valid Promoter').required('*Required'),
  creditTerm: yup.number('Numbers only').required('*Required'),
  cashTerm: yup
    .number('Numbers only')
    .typeError('Numbers Only')
    .required('*Required'),
  deposite: yup
    .number('Enter Valid Deposite Amount')
    .typeError('Numbers Only')
    .required('*Required'),
  approver1: yup.string('Enter a Valid Approver').required('*Required'),
  approver2: yup.string('Enter a Valid Approver').required('*Required'),
  distributorName: yup
    .string('Enter a Valid Distributor Name')
    .required('*Required'),
  storeClassification: yup
    .string('Enter a Valid Store Classification')
    .required('*Required'),
  registrations: yup.object().shape({
    gst: yup
      .boolean('Boolean Values Only')
      .typeError('Boolean Values Only')
      .required('*Required'),
    pan: yup
      .boolean('Boolean Values Only')
      .typeError('Boolean Values Only')
      .required('*Required'),
    eCart: yup
      .boolean('Boolean Values Only')
      .typeError('Boolean Values Only')
      .required('*Required'),
  }),
  skdAmount: yup.object().shape({
    from: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
    to: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
  }),
  annualAmount: yup.object().shape({
    from: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
    to: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
  }),
  quaterlyAmount: yup.object().shape({
    from: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
    to: yup
      .number('Numbers Only')
      .typeError('Numbers Only')
      .required('*Required'),
  }),
});
const Profile = () => {
  //////////////////////////////////////////states
  const [responseData, setResponseData] = useState('');

  //////////////////////////////////////////////////modelState
  const [personalDetailsModel, setPersonalDetailsModel] = useState(false);
  const [bankDetailsModel, setBankDetailsModel] = useState(false);
  const [storeDetailsModel, setStoreDetailsModel] = useState(false);
  const [contactDetailsModel, setContactDetailsModel] = useState(false);
  const [targetDetailsModel, setTargetDetailsModel] = useState(false);
  const [paymentTermsModel, setPaymentTermsModel] = useState(false);
  const [myOrganisationModel, setMyOrganisationModel] = useState(false);
  const [classificationDetailsModel, setClassificationDetailsModel] =
    useState(false);
  const [distributorNameModel, setDistributorNameModel] = useState(false);
  ///////////////////////////////////////////////useParams
  let { id } = useParams();

  ///////////////////////////////////////////loadProfile
  const loadProfile = useCallback(async () => {
    await axios
      .get(`http://localhost:3003/dealers?id=${id}`)
      .then((response) => {
        setResponseData(response.data[0]);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [id]);

  /////////////////////////////////////////////////////////////////////useEffect
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /////////////////////////////////////////toggles
  const togglePersonalDetailsModel = () => {
    setPersonalDetailsModel(!personalDetailsModel);
  };
  const toggleBankDetailsModel = () => {
    setBankDetailsModel(!bankDetailsModel);
  };
  const toggleStoreDetailsModel = () => {
    setStoreDetailsModel(!storeDetailsModel);
  };
  const toggleContactDetailsModel = () => {
    setContactDetailsModel(!contactDetailsModel);
  };
  const toggleTargetDetailsModel = () => {
    setTargetDetailsModel(!targetDetailsModel);
  };
  const togglePaymentTermsModel = () => {
    setPaymentTermsModel(!paymentTermsModel);
  };
  const toggleMyOrganisationModel = () => {
    setMyOrganisationModel(!myOrganisationModel);
  };
  const toggleClassificationDetailsModel = () => {
    setClassificationDetailsModel(!classificationDetailsModel);
  };
  const toggleDistributorNameModel = () => {
    setDistributorNameModel(!distributorNameModel);
  };
  ////////////////////////////////////onSubmit

  const onSubmit = async (props) => {
    await axios
      .put(`http://localhost:3003/dealers/${id}`, props)
      .then((response) => {
        console.log(response);
        setPersonalDetailsModel(false);
        setBankDetailsModel(false);
        setStoreDetailsModel(false);
        setContactDetailsModel(false);
        setTargetDetailsModel(false);
        setPaymentTermsModel(false);
        setMyOrganisationModel(false);
        setClassificationDetailsModel(false);
        setDistributorNameModel(false);
        loadProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ////////////////////////////////////////////////////////////////////cardDetails
  const personalDetails = [
    { title: 'Dealer Name', value: responseData.name },
    { title: 'Dealer Number', value: responseData.contact },
    { title: 'Registrations', value: responseData.registrations },
    { title: 'Billing Address', value: responseData.address },
  ];
  const bankDetails = [
    { title: 'Account Number', value: responseData.accountNumber },
    { title: 'UPI', value: responseData.upi },
    { title: 'Bank Name', value: responseData.bankName },
    { title: 'Card Number', value: responseData.cardNumber },
  ];
  const storeDetails = [
    { title: 'Shop Area', value: responseData.shopArea },
    { title: 'Shop Nature', value: responseData.shopNature },
    { title: 'Godown Area', value: responseData.godownArea },
  ];
  const contactDetils = [
    { title: 'Owner Name', value: responseData.ownerName },
    { title: 'Dealer Phone', value: responseData.dealerPhone },
    { title: 'My Manager', value: responseData.myManager },
    { title: 'Dealer Mail', value: responseData.dealerMail },
    { title: 'Promoter', value: responseData.promoter },
  ];
  const targetDetails = [
    {
      title: 'SKD Amount',
      value: [responseData.skdAmount],
    },
    {
      title: 'Annual Amount',
      value: [responseData.annualAmount],
    },
    {
      title: 'Quaterly Amount',
      value: [responseData.quaterlyAmount],
    },
  ];
  const paymentTerms = [
    { title: 'Credit Term', value: responseData.creditTerm },
    { title: 'cashTerm', value: responseData.cashTerm },
    { title: 'deposite', value: responseData.deposite },
  ];
  const myOrganisation = [
    { title: 'Approver 1', value: responseData.approver1 },
    { title: 'Approver 2', value: responseData.approver2 },
  ];
  const classificationDetails = [
    { title: 'Store Classification', value: responseData.storeClassification },
  ];
  return (
    <Container>
      <h4 className='pt-4 pb-5'>Dealer's Profile</h4>
      {responseData === '' ? (
        ''
      ) : (
        <>
          <CardDeck className='mb-3'>
            <PersonalDetails
              heading='Personal Details'
              details={personalDetails}
              click={() => setPersonalDetailsModel(!personalDetailsModel)}
            />
            <Details
              heading='Bank Details'
              details={bankDetails}
              click={() => setBankDetailsModel(!bankDetailsModel)}
            />
            <StoreDetails
              heading='Store Details'
              details={storeDetails}
              click={() => {
                setStoreDetailsModel(!storeDetailsModel);
              }}
            />
          </CardDeck>
          <CardDeck className='mb-3'>
            <Details
              heading='Contact Details'
              details={contactDetils}
              click={() => {
                setContactDetailsModel(!contactDetailsModel);
              }}
            />
            <TargetDetails
              heading='Target Details'
              details={targetDetails}
              click={() => setTargetDetailsModel(!targetDetailsModel)}
            />
            <PaymentTerms
              heading='Payment Terms'
              details={paymentTerms}
              click={() => {
                setPaymentTermsModel(!paymentTermsModel);
              }}
            />
          </CardDeck>
          <CardDeck className='mb-3'>
            <Details
              heading='My Organisation'
              details={myOrganisation}
              click={() => setMyOrganisationModel(!myOrganisationModel)}
            />
            <DistributorName
              heading='Dirtributor Name'
              name={responseData.distributorName}
              click={() => setDistributorNameModel(!distributorNameModel)}
            />
            <Details
              heading='Classification Details'
              details={classificationDetails}
              click={() =>
                setClassificationDetailsModel(!classificationDetailsModel)
              }
            />
          </CardDeck>
        </>
      )}
      <Modal isOpen={personalDetailsModel} toggle={togglePersonalDetailsModel}>
        <ModalHeader
          toggle={togglePersonalDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={togglePersonalDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Personal Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='Distributor'>Dealer's Name</Label>
                    <FastField
                      as={Input}
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      invalid={errors.name}
                      valid={!errors.name}
                    />
                    {errors.name === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.name}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='Contact Number'>Contact Number</Label>
                    <FastField
                      as={Input}
                      name='contact'
                      value={values.contact}
                      onChange={handleChange}
                      invalid={errors.contact}
                      valid={!errors.contact}
                    />
                    {errors.contact === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.contact}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='gst'>GST</Label>
                    <FastField
                      name='registrations.gst'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          invalid={
                            getIn(form.errors, 'registrations.gst') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'registrations.gst') ===
                            undefined
                          }
                          name='registrations.gst'
                          onBlur={handleBlur}
                          type='select'
                          onChange={handleChange}
                          className='selectHirarchy'>
                          <option selected disabled>
                            Select GST
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Input>
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='registrations.gst'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='pan'>PAN</Label>
                    <FastField
                      name='registrations.pan'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          invalid={
                            getIn(form.errors, 'registrations.pan') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'registrations.pan') ===
                            undefined
                          }
                          name='registrations.pan'
                          onBlur={handleBlur}
                          type='select'
                          onChange={handleChange}
                          className='selectHirarchy'>
                          <option selected disabled>
                            Select PAN
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Input>
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='registrations.pan'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='eCart'>E-Cart</Label>
                    <FastField
                      name='registrations.eCart'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          invalid={
                            getIn(form.errors, 'registrations.eCart') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'registrations.eCart') ===
                            undefined
                          }
                          name='registrations.eCart'
                          onBlur={handleBlur}
                          type='select'
                          onChange={handleChange}
                          className='selectHirarchy'>
                          <option selected disabled>
                            Select E-Cart
                          </option>
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                          <option value=''>hy</option>
                        </Input>
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='registrations.eCart'
                    />
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
      <Modal isOpen={bankDetailsModel} toggle={toggleBankDetailsModel}>
        <ModalHeader
          toggle={toggleBankDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={toggleBankDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Bank Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='accountNumber'>Account Number</Label>
                    <FastField
                      as={Input}
                      name='accountNumber'
                      value={values.accountNumber}
                      onChange={handleChange}
                      invalid={errors.accountNumber}
                      valid={!errors.accountNumber}
                    />
                    {errors.accountNumber === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.accountNumber}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='upi'>UPI</Label>
                    <FastField
                      as={Input}
                      name='upi'
                      value={values.upi}
                      onChange={handleChange}
                      invalid={errors.upi}
                      valid={!errors.upi}
                    />
                    {errors.upi === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.upi}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='bankName'>Bank Name</Label>
                    <FastField
                      as={Input}
                      name='bankName'
                      value={values.bankName}
                      onChange={handleChange}
                      invalid={errors.bankName}
                      valid={!errors.bankName}
                    />
                    {errors.bankName === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.bankName}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='cardNumber'>Card Number</Label>
                    <FastField
                      as={Input}
                      name='cardNumber'
                      value={values.cardNumber}
                      onChange={handleChange}
                      invalid={errors.cardNumber}
                      valid={!errors.cardNumber}
                    />
                    {errors.cardNumber === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.cardNumber}</FormFeedback>
                    )}
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
      <Modal isOpen={storeDetailsModel} toggle={toggleStoreDetailsModel}>
        <ModalHeader
          toggle={toggleStoreDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={toggleStoreDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>"Edit Store Details"</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='shopArea'>Shop Area</Label>
                    <FastField
                      as={Input}
                      name='shopArea'
                      value={values.shopArea}
                      onChange={handleChange}
                      invalid={errors.shopArea}
                      valid={!errors.shopArea}
                    />
                    {errors.shopArea === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.shopArea}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='shopNature'>Shop Nature</Label>
                    <FastField
                      as={Input}
                      name='shopNature'
                      value={values.shopNature}
                      onChange={handleChange}
                      invalid={errors.shopNature}
                      valid={!errors.shopNature}
                    />
                    {errors.shopNature === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.shopNature}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='godownArea'>Godown Area</Label>
                    <FastField
                      as={Input}
                      name='godownArea'
                      value={values.godownArea}
                      onChange={handleChange}
                      invalid={errors.godownArea}
                      valid={!errors.godownArea}
                    />
                    {errors.godownArea === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.godownArea}</FormFeedback>
                    )}
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
      <Modal isOpen={contactDetailsModel} toggle={toggleContactDetailsModel}>
        <ModalHeader
          toggle={toggleContactDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={toggleContactDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Contact Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='ownerName'>Owner Name</Label>
                    <FastField
                      as={Input}
                      name='ownerName'
                      value={values.ownerName}
                      onChange={handleChange}
                      invalid={errors.ownerName}
                      valid={!errors.ownerName}
                    />
                    {errors.ownerName === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.ownerName}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='dealerPhone'>Dealer Phone</Label>
                    <FastField
                      as={Input}
                      name='dealerPhone'
                      value={values.dealerPhone}
                      onChange={handleChange}
                      invalid={errors.dealerPhone}
                      valid={!errors.dealerPhone}
                    />
                    {errors.dealerPhone === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.dealerPhone}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='myManager'>My Manager</Label>
                    <FastField
                      as={Input}
                      name='myManager'
                      value={values.myManager}
                      onChange={handleChange}
                      invalid={errors.myManager}
                      valid={!errors.myManager}
                    />
                    {errors.myManager === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.myManager}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='dealerMail'>Dealer Mail</Label>
                    <FastField
                      as={Input}
                      name='dealerMail'
                      value={values.dealerMail}
                      onChange={handleChange}
                      invalid={errors.dealerMail}
                      valid={!errors.dealerMail}
                    />
                    {errors.dealerMail === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.dealerMail}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='promoter'>Promoter</Label>
                    <FastField
                      as={Input}
                      name='promoter'
                      value={values.promoter}
                      onChange={handleChange}
                      invalid={errors.promoter}
                      valid={!errors.promoter}
                    />
                    {errors.promoter === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.promoter}</FormFeedback>
                    )}
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
      <Modal isOpen={targetDetailsModel} toggle={toggleTargetDetailsModel}>
        <ModalHeader
          toggle={toggleTargetDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={toggleTargetDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Target Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({ isValid, handleChange, handleBlur, handleSubmit, dirty }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='annualAmount'>SKD Amount Min</Label>
                    <FastField name='skdAmount.from'>
                      {({ form, field }) => {
                        return (
                          <>
                            <Input
                              {...field}
                              name='skdAmount.from'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={
                                getIn(form.errors, 'skdAmount.from') !==
                                undefined
                              }
                              valid={
                                getIn(form.errors, 'skdAmount.from') ===
                                undefined
                              }
                            />

                            {console.log(form)}
                          </>
                        );
                      }}
                    </FastField>
                    <ErrorMessage
                      component={FormFeedback}
                      name='skdAmount.from'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='skdAmount'>SKD Amount Max</Label>
                    <FastField
                      name='skdAmount.to'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          name='skdAmount.to'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            getIn(form.errors, 'skdAmount.to') !== undefined
                          }
                          valid={
                            getIn(form.errors, 'skdAmount.to') === undefined
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='skdAmount.to'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='annualAmount'>Annual Amount Min</Label>
                    <FastField
                      name='annualAmount.from'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          name='annualAmount.from'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            getIn(form.errors, 'annualAmount.from') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'annualAmount.from') ===
                            undefined
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='annualAmount.from'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='annualAmount'>Annual Amount Max</Label>
                    <FastField
                      name='annualAmount.to'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          name='annualAmount.to'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            getIn(form.errors, 'annualAmount.to') !== undefined
                          }
                          valid={
                            getIn(form.errors, 'annualAmount.to') === undefined
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='annualAmount.to'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='quaterlyAmount'>Annual Amount Min</Label>
                    <FastField
                      name='quaterlyAmount.from'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          name='quaterlyAmount.from'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            getIn(form.errors, 'quaterlyAmount.from') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'quaterlyAmount.from') ===
                            undefined
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='quaterlyAmount.from'
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='quaterlyAmount'>Annual Amount Max</Label>
                    <FastField
                      name='quaterlyAmount.to'
                      render={({ form, field }) => (
                        <Input
                          {...field}
                          name='quaterlyAmount.to'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            getIn(form.errors, 'quaterlyAmount.to') !==
                            undefined
                          }
                          valid={
                            getIn(form.errors, 'quaterlyAmount.to') ===
                            undefined
                          }
                        />
                      )}
                    />
                    <ErrorMessage
                      component={FormFeedback}
                      name='quaterlyAmount.to'
                    />
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
      <Modal isOpen={paymentTermsModel} toggle={togglePaymentTermsModel}>
        <ModalHeader
          toggle={togglePaymentTermsModel}
          close={
            <FontAwesomeIcon
              onClick={togglePaymentTermsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Target Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='creditTerm'>Credit Term</Label>

                    <FastField
                      as={Input}
                      name='creditTerm'
                      value={values.creditTerm}
                      onChange={handleChange}
                      invalid={errors.creditTerm}
                      valid={!errors.creditTerm}
                    />
                    {errors.creditTerm === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.creditTerm}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='cashTerm'>Cash Term</Label>

                    <FastField
                      as={Input}
                      name='cashTerm'
                      value={values.cashTerm}
                      onChange={handleChange}
                      invalid={errors.cashTerm}
                      valid={!errors.cashTerm}
                    />
                    {errors.cashTerm === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.cashTerm}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='deposite'>Deposite</Label>

                    <FastField
                      as={Input}
                      name='deposite'
                      value={values.deposite}
                      onChange={handleChange}
                      invalid={errors.deposite}
                      valid={!errors.deposite}
                    />
                    {errors.deposite === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.deposite}</FormFeedback>
                    )}
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
      <Modal isOpen={myOrganisationModel} toggle={toggleMyOrganisationModel}>
        <ModalHeader
          toggle={toggleMyOrganisationModel}
          close={
            <FontAwesomeIcon
              onClick={toggleMyOrganisationModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Target Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              isValid,
              handleChange,
              handleSubmit,
              errors,
              values,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='approver1'>Approver 1</Label>
                    <FastField
                      as={Input}
                      name='approver1'
                      value={values.approver1}
                      onChange={handleChange}
                      invalid={errors.approver1}
                      valid={!errors.approver1}
                    />
                    {errors.approver1 === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.approver1}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for='approver2'>Approver 2</Label>
                    <FastField
                      as={Input}
                      name='approver2'
                      value={values.approver2}
                      onChange={handleChange}
                      invalid={errors.approver2}
                      valid={!errors.approver2}
                    />
                    {errors.approver2 === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.approver2}</FormFeedback>
                    )}
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
      <Modal isOpen={distributorNameModel} toggle={toggleDistributorNameModel}>
        <ModalHeader
          toggle={toggleDistributorNameModel}
          close={
            <FontAwesomeIcon
              onClick={toggleDistributorNameModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Distributor Name</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              isValid,
              handleChange,
              handleSubmit,
              errors,
              values,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='distributorName'>Distributor Name</Label>
                    <FastField
                      as={Input}
                      name='distributorName'
                      value={values.distributorName}
                      onChange={handleChange}
                      invalid={errors.distributorName}
                      valid={!errors.distributorName}
                    />
                    {errors.distributorName === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.distributorName}</FormFeedback>
                    )}
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
      <Modal
        isOpen={classificationDetailsModel}
        toggle={toggleClassificationDetailsModel}>
        <ModalHeader
          toggle={toggleClassificationDetailsModel}
          close={
            <FontAwesomeIcon
              onClick={toggleClassificationDetailsModel}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Edit Classification Details</h4>
          </div>
          <Formik
            initialValues={responseData}
            validationSchema={validationSchema}
            onSubmit={(props) => onSubmit(props)}>
            {({
              isValid,
              handleChange,
              handleSubmit,
              errors,
              values,
              dirty,
            }) => (
              <>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='storeClassification'>
                      Store Classification
                    </Label>
                    <FastField
                      as={Input}
                      name='storeClassification'
                      value={values.storeClassification}
                      onChange={handleChange}
                      invalid={errors.storeClassification}
                      valid={!errors.storeClassification}
                    />
                    {errors.storeClassification === undefined ? (
                      <FormFeedback></FormFeedback>
                    ) : (
                      <FormFeedback>{errors.storeClassification}</FormFeedback>
                    )}
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

export default Profile;
const PersonalDetails = ({ heading, details, click }) => {
  return (
    <>
      <Card className='personalDetails_card'>
        <CardBody className='p-2'>
          <div className='d-flex justify-content-end'>
            <EditIcon click={click} />
          </div>
          <h4 className='textBlue'>{heading}</h4>

          <div className='d-flex textBlue'>
            <Label className='textBlue'>{details[0].title}</Label>:
            <p className='ml-2'> {details[0].value}</p>
          </div>
          <div className='d-flex textBlue'>
            <Label>{details[1].title}</Label>:
            <p className='ml-2'> {details[1].value}</p>
          </div>
          <div className='d-flex'>
            <Label>Registrations</Label>:
            <p
              className={
                details[2].value.gst ? 'validGst mx-2' : ' inValidGst mx-2'
              }>
              GST
            </p>
            <p
              className={
                details[2].value.pan ? 'validGst mx-2' : ' inValidGst mx-2'
              }>
              PAN
            </p>
            <p
              className={
                details[2].value.eCart ? 'validGst mx-2' : ' inValidGst mx-2'
              }>
              E-Cart
            </p>
          </div>
          <div className='d-flex textBlue'>
            <Label>{details[3].title}</Label>:
            <p className='ml-2'> {details[3].value}</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
const Details = ({ heading, details, click }) => {
  return (
    <>
      <Card className='textBlue personalDetails_card'>
        <CardBody className='p-2'>
          <div className='d-flex justify-content-end'>
            <EditIcon click={click} />
          </div>
          <h4>{heading}</h4>
          {details.map((data, index) => {
            return (
              <div className='d-flex' key={index}>
                <Label>{data.title}</Label>:<p className='ml-2'>{data.value}</p>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
};
const TargetDetails = ({ heading, details, click }) => {
  return (
    <>
      <Card className='textBlue personalDetails_card'>
        <CardBody className='p-2'>
          <div className='d-flex justify-content-end'>
            <EditIcon click={click} />
          </div>
          <h4>{heading}</h4>
          {details.map((data, index) => {
            return (
              <div className='d-flex' key={index}>
                <Label>{data.title}</Label>:
                <p className='ml-2'> ₹{data.value[0].to}</p>/
                <p className='ml-2'> ₹{data.value[0].from}</p>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
};
const PaymentTerms = ({ heading, details, click }) => {
  return (
    <>
      <Card className='textBlue personalDetails_card'>
        <CardBody className='p-2'>
          <div className='d-flex justify-content-end'>
            <EditIcon click={click} />
          </div>
          <h4>{heading}</h4>

          <div className='d-flex'>
            <Label>{details[0].title}</Label>:
            <p className='ml-2'> {details[0].value}</p>
            <p className='ml-1'>Days</p>
          </div>
          <div className='d-flex'>
            <Label>{details[1].title}</Label>:
            <p className='ml-2'> {details[1].value}</p>
            <p className='ml-1'>Days</p>
          </div>
          <div className='d-flex'>
            <Label>{details[2].title}</Label>:
            <p className='ml-2'> ₹{details[2].value}</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
const DistributorName = ({ name, heading, click }) => {
  return (
    <Card className='textBlue personalDetails_card'>
      <CardBody className='p-2'>
        <div className='d-flex justify-content-end'>
          <EditIcon click={click} />
        </div>
        <h4>{heading}</h4>
        <div className='d-flex justify-content-center'>
          <p>{name}</p>
        </div>
      </CardBody>
    </Card>
  );
};
const StoreDetails = ({ heading, details, click }) => {
  return (
    <>
      <Card className='textBlue personalDetails_card'>
        <CardBody className='p-2'>
          <div className='d-flex justify-content-end'>
            <EditIcon click={click} />
          </div>
          <h4>{heading}</h4>
          <div className='d-flex'>
            <Label>{details[0].title}</Label>:
            <p className='ml-2'>{details[0].value} sqft</p>
          </div>
          <div className='d-flex'>
            <Label>{details[1].title}</Label>:
            <p className='ml-2'>{details[1].value}</p>
          </div>
          <div className='d-flex'>
            <Label>{details[2].title}</Label>:
            <p className='ml-2'>{details[2].value} sqft</p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
const EditIcon = ({ click }) => {
  return <FontAwesomeIcon className='textBlue' icon={faPen} onClick={click} />;
};
