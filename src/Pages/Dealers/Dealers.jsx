import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPlus,
  faSearch,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  Button,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import TableTax from '../../components/Table/TableTax';
import { FastField, Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { Link } from 'react-router-dom';
let validationSchema = yup.object().shape({
  name: yup.string().required('Required').min(3),
  city: yup.string('Enter a Valid City').required('Required'),
  contact: yup.string().phone('IN').required('Required'),
  state: yup.string().required('Required'),
  email: yup.string().email('Enter a valid email').required('Required'),
  password: yup
    .string()
    .required('required')
    .min(8, 'Minimum 8 characters required'),
});
const initialValues = {
  name: '',
  email: '',
  city: '',
  state: '',
  password: '',
  contact: '',
};
const Dealers = () => {
  const [responseData, setResponseData] = useState([
    { id: '', name: '', city: '', state: '', contact: '' },
  ]);
  const [filterInput, setFilterInput] = useState('');
  const [states, setStates] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter('name', value);
    setFilterInput(value);
  };
  const loadDealer = useCallback(async () => {
    await axios
      .get('http://localhost:3003/dealers')
      .then((response) => {
        setResponseData(response.data);
        const result = response.data;
        setStates([...new Set(result.map((x) => x.state))]);

        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setResponseData]);
  useEffect(() => {
    loadDealer();
  }, [loadDealer]);
  const deleteDealer = async (props) => {
    await axios
      .delete(`http://localhost:3003/dealers/${props}`)
      .then((response) => {
        console.log('response delete', response);
        loadDealer();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DEALERS_COLUMN = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Contact No.', accessor: 'contact' },
      {
        Header: 'Actions',
        accessor: 'action',
        disableSortBy: true,
        Cell: (props) => {
          const row = props.row.original.id;
          return (
            <div className='d-flex justify-content-center '>
              <span>
                <Link to={`dealer/${row}`}>
                  <FontAwesomeIcon className='icon' icon={faEye} />
                </Link>
              </span>

              <span
                className='ml-2'
                onClick={() => {
                  deleteDealer(row);
                }}>
                <FontAwesomeIcon className='icon' icon={faTrash} />
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
  const handleSelectFilterChange = (e) => {
    const value = e.target.value === undefined ? '' : e.target.value;
    setFilter('state', value);
  };

  const toggle = () => setCreateModel(!createModel);
  const columns = useMemo(() => DEALERS_COLUMN, [DEALERS_COLUMN]);

  const data = useMemo(() => responseData, [responseData]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const onSubmit = async (props) => {
    await axios
      .post('http://localhost:3003/dealers', props)
      .then((response) => {
        console.log('response', response);
        loadDealer();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { pageIndex, pageSize } = state;
  return (
    <>
      <Container>
        <h4 className='pt-4 pb-5'>Dealer's List</h4>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex w-100 ml-3  mb-3 filters'>
            <div className='d-flex flex-column mr-3 w-100'>
              <span>Dealer</span>
              <InputGroup size='sm'>
                <Input
                  value={filterInput}
                  onChange={handleFilterChange}
                  placeholder='Search Dealer'
                />
                <InputGroupAddon addonType='append'>
                  <InputGroupText>
                    <FontAwesomeIcon className='icon' icon={faSearch} />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className='d-flex flex-column mr-3 w-100'>
              <span>State</span>
              <InputGroup size='sm'>
                <Input
                  type='select'
                  name='select'
                  onChange={(e) => handleSelectFilterChange(e)}
                  id='exampleSelect'>
                  <option value=''>All</option>
                  {states.map((data, index) => {
                    return (
                      <option value={data} key={index}>
                        {data}
                      </option>
                    );
                  })}
                </Input>
              </InputGroup>
            </div>
          </div>
          <div className='d-flex text-right justify-content-end '>
            <Button className='text-right' size='sm' onClick={toggle}>
              <FontAwesomeIcon className='mr-1' icon={faPlus} /> Create New
            </Button>
          </div>
        </div>{' '}
        <TableTax
          columns={columns}
          data={data}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          page={page}
          nextPage={nextPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          pageOptions={pageOptions}
          state={state}
          gotoPage={gotoPage}
          pageCount={pageCount}
          setPageSize={setPageSize}
          prepareRow={prepareRow}
          setFilter={setFilter}
          pageIndex={pageIndex}
          pageSize={pageSize}
          actionWidth={true}
        />
        <Modal isOpen={createModel} toggle={toggle}>
          <ModalHeader
            toggle={toggle}
            close={
              <FontAwesomeIcon
                onClick={toggle}
                className='model_close_btn'
                icon={faTimes}
              />
            }></ModalHeader>
          <ModalBody>
            <div className='d-flex justify-content-center w-100 mb-2'>
              <h4>Create Dealer</h4>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(props) => onSubmit(props)}>
              {({
                values,
                touched,
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
                        invalid={touched.name && errors.name}
                        valid={dirty && !errors.name}
                      />
                      {errors.name === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.name}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='State'>State</Label>
                      <FastField
                        as={Input}
                        name='state'
                        value={values.state}
                        onChange={handleChange}
                        invalid={touched.state && errors.state}
                        valid={dirty && !errors.state}
                      />
                      {errors.state === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.state}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='City'>City</Label>
                      <FastField
                        as={Input}
                        name='city'
                        value={values.city}
                        onChange={handleChange}
                        invalid={touched.city && errors.city}
                        valid={dirty && !errors.city}
                      />
                      {errors.city === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.city}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Contact Number'>Contact Number</Label>
                      <FastField
                        as={Input}
                        name='contact'
                        value={values.contact}
                        onChange={handleChange}
                        invalid={touched.contact && errors.contact}
                        valid={dirty && !errors.contact}
                      />
                      {errors.contact === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.contact}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Email Id'>Email Id</Label>
                      <FastField
                        as={Input}
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        invalid={touched.email && errors.email}
                        valid={dirty && !errors.email}
                      />
                      {errors.email === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='Password'>Password</Label>
                      <FastField
                        as={Input}
                        bsSize='sm'
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        invalid={touched.password && errors.password}
                        valid={dirty && !errors.password}
                      />
                      {errors.password === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.password}</FormFeedback>
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
    </>
  );
};

export default Dealers;
