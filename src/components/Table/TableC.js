import React, { useState } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import {
  Container,
  Table,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
import * as yup from 'yup';
import 'yup-phone';
import './TableC.css';
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
  faPlus,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FastField, Formik } from 'formik';
import axios from 'axios';
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
export const TableC = ({
  columns,
  data,
  heading,
  searchTitle,
  searchPlaceHolder,
  dropdownList,
  bordered,
  filter,
  dropfilter,
  reload,
}) => {
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
  const [createModel, setcreateModel] = useState(false);
  const [filterInput, setFilterInput] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(filter, value);
    setFilterInput(value);
  };
  const handleSelectFilterChange = (e) => {
    const value = e.target.value === undefined ? '' : e.target.value;
    setFilter(dropfilter, value);
  };
  const { pageIndex, pageSize } = state;
  const toggle = () => setcreateModel(!createModel);
  const onSubmit = async (e, values) => {
    e.preventDefault();
    await axios.post('http://localhost:3003/distributors', values);
    console.log(values);
    setcreateModel(false);
    reload();
  };
  const closeIcon = (
    <FontAwesomeIcon
      onClick={toggle}
      className='model_close_btn'
      icon={faTimes}
    />
  );
  return (
    <Container>
      <h4 className='pt-4 pb-5'>{heading}</h4>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex w-100 ml-3  mb-3 filters'>
          <div className='d-flex flex-column mr-3 w-100'>
            <span>{searchTitle}</span>
            <InputGroup size='sm'>
              <Input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={searchPlaceHolder}
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
                {dropdownList.map((data, index) => {
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
      </div>
      <Modal isOpen={createModel} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeIcon}></ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center w-100 mb-2'>
            <h4>Create {searchTitle}</h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => onSubmit(e)}
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
                    <Label for='Distributor'>{searchTitle} Name</Label>
                    <FastField
                      as={Input}
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      invalid={touched.name && errors.name}
                      valid={dirty && !errors.name}
                    />
                    <FormFeedback>Enter a valid name</FormFeedback>
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
                    <FormFeedback>Enter a valid state</FormFeedback>
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
                    <FormFeedback>Enter a valid city</FormFeedback>
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
                    <FormFeedback>Enter a valid contact number</FormFeedback>
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
                    <FormFeedback>Enter a Email Id</FormFeedback>
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
                    <FormFeedback>Enter a valid 10 digit password</FormFeedback>
                  </FormGroup>
                  <Button
                    onClick={(e) => {
                      onSubmit(e, values);
                    }}
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
      <Table bordered={bordered} {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span className=''>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faLongArrowAltDown} />
                      ) : (
                        <FontAwesomeIcon icon={faLongArrowAltUp} />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className='text-center align-middle'
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className='d-flex mb-3 justify-content-end align-items-center'>
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span className=' d-flex align-items-center'>
          | Go to page:
          <Input
            className='pageInput mx-1'
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}></Input>
        </span>
        <Input
          className='w-auto'
          type='select'
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 25, 50].map((pageSize, index) => (
            <option key={index} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Input>
        <Button
          className='p-1 mx-1'
          onClick={() => {
            gotoPage(0);
          }}
          disabled={!canPreviousPage}>
          {'<<'}
        </Button>

        <Button
          className='p-1 mx-1'
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button
          className='p-1 mx-1'
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}>
          Next
        </Button>
        <Button
          className='p-1 mx-1'
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}>
          {'>>'}
        </Button>
      </div>
    </Container>
  );
};
