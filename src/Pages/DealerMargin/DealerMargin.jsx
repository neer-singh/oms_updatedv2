import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Input } from 'reactstrap';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastField, Formik } from 'formik';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import * as yup from 'yup';
import './DealerMargin.css';
const DealerMargin = () => {
  //=======================================================states
  const [region, setRegion] = useState('');
  const [allStates, setAllStates] = useState('');
  const [dataResponse, setDataResponse] = useState('');
  const [createModelHigh, setCreateModelHigh] = useState(false);
  const [createModelLow, setCreateModelLow] = useState(false);
  const [createModelMid, setCreateModelMid] = useState(false);
  const [addMarig, setAddMarig] = useState(false);
  const [initialValues, setInitialValues] = useState('');

  const toggleHigh = () => {
    setCreateModelHigh(!createModelHigh);
  };
  const toggleLow = () => {
    setCreateModelLow(!createModelLow);
  };
  const toggleMid = () => {
    setCreateModelMid(!createModelMid);
  };
  const toggle = (e) => {
    console.log(e);
    setAddMarig(!addMarig);
  };

  //========================================initialValues
  const addInitials = {
    High: '',
    Mid: '',
    Low: '',
    hierarchy: '',
  };

  const onSubmitAdd = async (props) => {
    console.log(props);
    axios
      .put(`http://localhost:3003/dealerMargin/${dataResponse[0].id}`, {
        state: dataResponse[0].state,
        hierarchy: props.hierarchy,
        Mid: props.Mid,
        High: props.High,
        Low: props.Low,
      })
      .then((response) => {
        console.log('response.data', response.data);
      })
      .catch((error) => {
        console.log('submition error', error);
      });
    LoadMargin();
  };
  const onSubmit = async (props) => {
    axios
      .put(`http://localhost:3003/dealerMargin/${dataResponse[0].id}`, {
        hierarchy: dataResponse[0].hierarchy,
        state: dataResponse[0].state,
        Low: props.Low,
        High: props.High,
        Mid: props.Mid,
      })
      .then((response) => {
        setInitialValues(response.data);
        setCreateModelHigh(false);
        setCreateModelLow(false);
        setCreateModelMid(false);
        LoadMargin();
      })
      .catch((error) => {
        console.error('Something went wrong!', error);
      });
  };
  //===========================================selectHandle
  const selectHandle = (e) => {
    setRegion(e.target.value);
  };

  //=================================loadMargin
  const LoadMargin = useCallback(async () => {
    const result = await axios.get('http://localhost:3003/dealerMargin');
    const state = [];
    const stat = [];
    for (let index = 0; index < result.data.length; index++) {
      const element = result.data[index];
      element.state === region ? stat.push(element) : console.log('hello');
      element.state === region
        ? setInitialValues(element)
        : console.log('hello');
      state.push(result.data[index].state);
      console.log('element', element);
    }
    setAllStates(state);
    setDataResponse(stat);
  }, [region]);
  //======================================================useEffect
  useEffect(() => {
    LoadMargin();
  }, [LoadMargin]);
  //===========================================validationSchema
  let validationSchema = yup.object().shape({
    High: yup.number().required().max(100).positive(),
    Mid: yup.number().required().max(100).positive(),
    Low: yup.number().required().max(100).positive(),
  });
  let addMarginSchema = yup.object().shape({
    High: yup.number().required('*required').max(100).positive(),
    Mid: yup.number().required('*required').max(100).positive(),
    Low: yup.number().required('*required').max(100).positive(),
    hierarchy: yup.string().required('*required'),
  });

  return (
    //=====================================================container
    <Container>
      <h4 className='pt-4 pb-5'>Dealer Margin</h4>
      {/* ============================================================select */}
      <div className='selectState'>
        <label className='label' htmlFor='State'>
          State
        </label>

        <Input type='select' defaultValue='Set state' onChange={selectHandle}>
          <option value=''>Select state</option>
          {allStates === ''
            ? ''
            : allStates.map((data, index) => {
                return (
                  <option key={index} value={data} name={data}>
                    {data}
                  </option>
                );
              })}
        </Input>
      </div>
      {/* =================================================condition  */}
      {dataResponse.length === 0 ? (
        console.log('challo')
      ) : dataResponse[0].hierarchy === '' ? (
        // ===========================================================add Margin
        <div
          onClick={(e) => {
            toggle(e);
          }}
          className='d-flex justify-content-lg-between mt-3'>
          <div className='add_margins d-flex'>+ Add Margin</div>
          <Formik
            initialValues={addInitials}
            validationSchema={addMarginSchema}
            onSubmit={(props) => {
              onSubmitAdd(props);
            }}
            isInitialValid={() => validationSchema.isValidSync(addInitials)}>
            {({
              values,
              isValid,
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              dirty,
              touched,
            }) => (
              <>
                <Modal isOpen={addMarig} toggle={toggle}>
                  <ModalHeader
                    toggle={toggleHigh}
                    close={
                      <FontAwesomeIcon
                        onClick={toggle}
                        className='model_close_btn'
                        icon={faTimes}
                      />
                    }></ModalHeader>
                  <ModalBody>
                    <div className='d-flex justify-content-center w-100 mb-2'>
                      <h4>Add Margin</h4>
                    </div>
                    <div className='d-flex justify-content-center defaults my-4'>
                      <div className='d-flex justify-content-center'>
                        <p className='region'>{'State: '} </p>
                        <p>{region}</p>
                      </div>
                    </div>
                    <Form className='form' onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label>Hierarchy</Label>
                        <FastField
                          name='hierarchy'
                          render={({ field }) => (
                            <Input
                              {...field}
                              invalid={errors.hierarchy !== undefined}
                              valid={
                                errors.hierarchy === undefined &&
                                touched.hierarchy
                              }
                              name='hierarchy'
                              onBlur={handleBlur}
                              type='select'
                              value={values.hierarchy}
                              onChange={handleChange}
                              className='selectHirarchy'>
                              <option value='' selected disabled>
                                Select Hierarchy
                              </option>
                              {[
                                'ENERGISE MATTRESSES',
                                'DUROPEDIC MATTRESSES',
                                'ESSENTIAL MATTRESS',
                                'NATURAL LIVING MATTRESS',
                              ].map((data, index) => (
                                <option value={data} key={index}>
                                  {data}
                                </option>
                              ))}
                            </Input>
                          )}
                        />
                        {console.log('errors', errors)}
                        {errors.hierarchy === undefined ? (
                          <FormFeedback></FormFeedback>
                        ) : (
                          <FormFeedback>{errors.hierarchy}</FormFeedback>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='Distributor' className='region'>
                          High
                        </Label>
                        <InputGroup>
                          <FastField
                            as={Input}
                            name='High'
                            value={values.High}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            invalid={errors.High !== undefined}
                            valid={errors.High === undefined && touched.High}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText className='suffixbtn'>
                              %
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormFeedback>
                            {errors.High === undefined
                              ? console.log('errors.High', errors.High)
                              : errors.High}
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Label for='Distributor' className='region'>
                          Mid
                        </Label>
                        <InputGroup>
                          <FastField
                            as={Input}
                            name='Mid'
                            value={values.Mid}
                            onChange={handleChange}
                            invalid={errors.Mid !== undefined}
                            onBlur={handleBlur}
                            valid={errors.Mid === undefined && touched.Mid}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText className='suffixbtn'>
                              %
                            </InputGroupText>
                          </InputGroupAddon>
                          <FormFeedback>
                            {errors.Mid === undefined
                              ? console.log('errors.Mid', errors.Mid)
                              : errors.Mid}
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Label for='Distributor' className='region'>
                          Low
                        </Label>
                        <InputGroup>
                          <FastField
                            as={Input}
                            name='Low'
                            value={values.Low}
                            onChange={handleChange}
                            invalid={errors.Low !== undefined}
                            onBlur={handleBlur}
                            valid={errors.Low === undefined && touched.Low}
                          />
                          <InputGroupAddon addonType='append'>
                            <InputGroupText className='suffixbtn'>
                              %
                            </InputGroupText>
                          </InputGroupAddon>{' '}
                          {errors.Low === undefined ? (
                            <FormFeedback></FormFeedback>
                          ) : (
                            <FormFeedback>{errors.Low}</FormFeedback>
                          )}
                        </InputGroup>
                      </FormGroup>
                      <Button
                        type='submit'
                        className='w-100 mt-3'
                        color='secondary'
                        disabled={!dirty || !isValid}>
                        Save
                      </Button>
                    </Form>
                  </ModalBody>
                </Modal>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <div className='d-flex justify-content-between mt-5'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(props) => {
              onSubmit(props);
            }}
            isInitialValid={() => validationSchema.isValidSync(initialValues)}>
            {({
              values,
              isValid,
              handleChange,
              handleSubmit,
              handleBlur,
              dirty,
            }) => (
              <>
                <div>
                  <div className='add_margin my-3 d-flex'>
                    <div className='d-flex icon_container'>
                      <FontAwesomeIcon
                        onClick={() => setCreateModelHigh(!createModelHigh)}
                        className='editicon'
                        icon={faPen}
                      />
                    </div>

                    <p className='p'>Type</p>
                    <h3>High</h3>
                    <div className='margin'>
                      <h1>{dataResponse[0].High}%</h1>
                      <p className='p'>Margin</p>
                    </div>
                    <div>
                      <p className='p'>hierarchy</p>
                      <h3>{dataResponse[0].hierarchy}</h3>
                    </div>
                  </div>
                  <Modal isOpen={createModelHigh} toggle={toggleHigh}>
                    <ModalHeader
                      toggle={toggleHigh}
                      close={
                        <FontAwesomeIcon
                          onClick={toggleHigh}
                          className='model_close_btn'
                          icon={faTimes}
                        />
                      }></ModalHeader>
                    <ModalBody>
                      <div className='d-flex justify-content-center w-100 mb-2'>
                        <h4>Edit Margin</h4>
                      </div>
                      <div className='defaults my-4'>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'State: '} </p>
                          <p className=''>{region}</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'Hierarchy: '} </p>
                          <p className=''>{dataResponse[0].hierarchy}</p>
                        </div>
                      </div>

                      <Form className='form' onSubmit={handleSubmit}>
                        {console.log('values', values)}
                        <FormGroup>
                          <Label for='Distributor' className='region'>
                            High
                          </Label>
                          <InputGroup>
                            <FastField
                              as={Input}
                              name='High'
                              value={values.High}
                              onChange={handleChange}
                              invalid={!isValid}
                              onBlur={handleBlur}
                              valid={isValid}
                            />
                            <InputGroupAddon addonType='append'>
                              <InputGroupText className='suffixbtn'>
                                %
                              </InputGroupText>
                            </InputGroupAddon>
                            <FormFeedback>Enter a valid number</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <Button
                          type='submit'
                          className='w-100 mt-3'
                          color='secondary'
                          disabled={!dirty || !isValid}>
                          Save
                        </Button>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
                <div>
                  <div className='add_margin my-3 d-flex'>
                    <div className='d-flex icon_container'>
                      <FontAwesomeIcon
                        onClick={() => setCreateModelMid(!createModelMid)}
                        className='editicon'
                        icon={faPen}
                      />
                    </div>
                    <p className='p'>Type</p>
                    <h3>Mid</h3>
                    <div className='margin'>
                      <h1>{dataResponse[0].Mid}%</h1>
                      <p className='p'>Margin</p>
                    </div>
                    <div>
                      <p className='p'>hierarchy</p>
                      <h3>{dataResponse[0].hierarchy}</h3>
                    </div>
                  </div>
                  <Modal isOpen={createModelMid} toggle={toggleMid}>
                    <ModalHeader
                      toggle={toggleMid}
                      close={
                        <FontAwesomeIcon
                          onClick={toggleMid}
                          className='model_close_btn'
                          icon={faTimes}
                        />
                      }></ModalHeader>
                    <ModalBody>
                      <div className='d-flex justify-content-center w-100 mb-2'>
                        <h4>Edit Margin</h4>
                      </div>
                      <div className='defaults my-4'>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'State: '} </p>
                          <p className=''>{region}</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'Hierarchy: '} </p>
                          <p className=''>{dataResponse[0].hierarchy}</p>
                        </div>
                      </div>

                      <Form className='form' onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for='Distributor' className='region'>
                            Mid
                          </Label>
                          <InputGroup>
                            <FastField
                              as={Input}
                              name='Mid'
                              value={values.Mid}
                              onChange={handleChange}
                              invalid={!isValid}
                              onBlur={handleBlur}
                              valid={isValid}
                            />
                            <InputGroupAddon addonType='append'>
                              <InputGroupText className='suffixbtn'>
                                %
                              </InputGroupText>
                            </InputGroupAddon>
                            <FormFeedback>Enter a valid number</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <Button
                          type='submit'
                          className='w-100 mt-3'
                          color='secondary'
                          disabled={!dirty || !isValid}>
                          Save
                        </Button>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
                <div>
                  <div className='add_margin my-3 d-flex'>
                    <div className='d-flex icon_container'>
                      <FontAwesomeIcon
                        onClick={() => setCreateModelLow(!createModelLow)}
                        className='editicon'
                        icon={faPen}
                      />
                    </div>
                    <p className='p'>Type</p>
                    <h3>Low</h3>
                    <div className='margin'>
                      <h1>{dataResponse[0].Low}%</h1>
                      <p className='p'>Margin</p>
                    </div>
                    <div>
                      <p className='p'>hierarchy</p>
                      <h3>{dataResponse[0].hierarchy}</h3>
                    </div>
                  </div>
                  <Modal isOpen={createModelLow} toggle={toggleLow}>
                    <ModalHeader
                      toggle={toggleLow}
                      close={
                        <FontAwesomeIcon
                          onClick={toggleLow}
                          className='model_close_btn'
                          icon={faTimes}
                        />
                      }></ModalHeader>
                    <ModalBody>
                      <div className='d-flex justify-content-center w-100 mb-2'>
                        <h4>Edit Margin</h4>
                      </div>
                      <div className='defaults my-4'>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'State: '} </p>
                          <p className=''>{region}</p>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <p className='region'>{'Hierarchy: '} </p>
                          <p className=''>{dataResponse[0].hierarchy}</p>
                        </div>
                      </div>

                      <Form className='form' onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label for='Distributor' className='region'>
                            Low
                          </Label>
                          <InputGroup>
                            <FastField
                              as={Input}
                              name='Low'
                              value={values.Low}
                              onChange={handleChange}
                              invalid={!isValid}
                              onBlur={handleBlur}
                              valid={isValid}
                            />
                            <InputGroupAddon addonType='append'>
                              <InputGroupText className='suffixbtn'>
                                %
                              </InputGroupText>
                            </InputGroupAddon>
                            <FormFeedback>Enter a valid number</FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        <Button
                          type='submit'
                          className='w-100 mt-3'
                          color='secondary'
                          disabled={!dirty || !isValid}>
                          Save
                        </Button>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </>
            )}
          </Formik>
        </div>
      )}
    </Container>
  );
};

export default DealerMargin;
