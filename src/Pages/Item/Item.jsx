import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import * as yup from 'yup';
import { FastField, Formik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
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
import './Item.css';
import TableTax from '../../components/Table/TableTax';
const initialValues = {
  sku: '',
  hierarchy: '',
  category: '',
  type: '',
  hmlcategory: '',
  mrp: '',
};

const Item = () => {
  const [item, setItem] = useState([initialValues]);
  const [row, setRow] = useState('');
  const [category, setCategory] = useState([]);
  const [type, settype] = useState([]);
  const [hml, sethml] = useState([]);

  const [editModel, setEditModel] = useState(false);
  const [createModel, setCreateModel] = useState(false);
  let validationSchema = yup.object().shape({
    sku: yup.string().required('* required'),
    hierarchy: yup.string().required('* required'),
    category: yup.string().required('* required'),
    hmlcategory: yup.string().required('* required'),
    type: yup.string().required('* required'),
    mrp: yup.string().required('* required'),
  });
  const Loaditem = useCallback(async () => {
    await axios
      .get('http://localhost:3003/item')
      .then((response) => {
        setItem(response.data);
        const category = [...new Set(response.data.map((x) => x.category))];
        const type = [...new Set(response.data.map((x) => x.type))];
        const hmlcategory = [
          ...new Set(response.data.map((x) => x.hmlcategory)),
        ];
        setCategory(category);
        settype(type);
        sethml(hmlcategory);
        return null;
      })

      .catch((error) => {
        console.log('catch', error);
      });
  }, [setItem, setCategory]);
  const editRow = (props) => setRow(props);
  const onSubmit = async (props) => {
    await axios
      .post('http://localhost:3003/item', props)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('catcherror', error);
      });
  };
  const onEditSubmit = async (props) => {
    console.log('editsubmit', props);
    const rowIdx = props.id;
    console.log('rowIdx', rowIdx);
    await axios
      .put(`http://localhost:3003/item/${rowIdx}`, props)
      .then((response) => {
        setEditModel(false);
        setCreateModel(false);
        console.log('response', response);
        Loaditem();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    Loaditem();
  }, [
    Loaditem,
    // category
  ]);
  const ITEMS_COLUMN = useMemo(
    () => [
      {
        Header: 'SKU',
        accessor: 'sku',
      },
      { Header: 'Product Hierarchy', accessor: 'hierarchy' },
      { Header: 'Product Category', accessor: 'category' },
      { Header: 'Product Type', accessor: 'type' },
      { Header: 'HML Category', accessor: 'hmlcategory' },
      { Header: 'MRP', accessor: 'mrp' },

      {
        Header: 'Actions',
        accessor: 'action',
        disableSortBy: true,
        Cell: (props) => {
          const rowIdx = props.row.original;
          return (
            <div className='d-flex justify-content-around'>
              <Button
                className='item-edit'
                onClick={() => {
                  setEditModel(!editModel);
                  editRow(rowIdx);
                }}>
                Edit
              </Button>
            </div>
          );
        },
      },
    ],
    [editModel]
  );
  const columns = useMemo(() => ITEMS_COLUMN, [ITEMS_COLUMN]);
  const data = useMemo(() => item, [item]);
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
  const toggle = () => {
    editModel ? setEditModel(!editModel) : setCreateModel(!createModel);
  };

  const handleSelectFilterChange = (e, prop) => {
    const value = e.target.value || undefined;
    setFilter(prop, value);
  };
  const { pageIndex, pageSize } = state;
  return category.length && hml.length && type.length < 1 ? (
    <div></div>
  ) : (
    <>
      <Container>
        <h4 className='pt-4 pb-5'>Item</h4>
        <div className='d-flex ml-3  mb-3 itemfilters'>
          <div className='d-flex flex-column mr-3 w-100 itemselect'>
            <Label className='label'>Product Category</Label>
            <InputGroup size='sm'>
              <Input
                type='select'
                onChange={(e) => handleSelectFilterChange(e, 'category')}>
                <option value=''>All</option>
                {category.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </Input>
            </InputGroup>
          </div>
          <div className='d-flex flex-column mr-3 w-100 taxselect'>
            <Label className='label'>HML</Label>
            <InputGroup size='sm'>
              <Input
                type='select'
                onChange={(e) => handleSelectFilterChange(e, 'hmlcategory')}>
                <option value=''>All</option>
                {hml.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </Input>
            </InputGroup>
          </div>
          <div className='d-flex flex-column mr-3 w-100 taxselect'>
            <Label className='label'>Product Type</Label>
            <InputGroup size='sm'>
              <Input
                type='select'
                onChange={(e) => handleSelectFilterChange(e, 'type')}>
                <option value=''>All</option>
                {type.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </Input>
            </InputGroup>
          </div>
          <div className='d-flex w-100 createitem'>
            <Button
              onClick={() => {
                toggle();
              }}>
              <span className='mr-2'>{<FontAwesomeIcon icon={faPlus} />}</span>
              Create New
            </Button>
          </div>
        </div>

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
        />
      </Container>
      <Modal isOpen={editModel ? editModel : createModel} toggle={toggle}>
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
          {' '}
          <Formik
            initialValues={editModel ? row : initialValues}
            validationSchema={validationSchema}
            onSubmit={
              editModel
                ? (props) => {
                    onEditSubmit(props);
                  }
                : (props) => {
                    onSubmit(props);
                  }
            }
            isInitialValid={() => validationSchema.isValidSync(initialValues)}>
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
                <div className='d-flex justify-content-center w-100 mb-2'>
                  {editModel ? <h4>Edit Margin</h4> : <h4>Add Margin</h4>}
                </div>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      Product Category
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='category'
                        value={values.category}
                        invalid={errors.category !== undefined}
                        valid={
                          errors.category === undefined && touched.category
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.category === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.category}</FormFeedback>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      Product Type
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='type'
                        value={values.type}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        invalid={errors.type !== undefined}
                        valid={errors.type === undefined && touched.type}
                      />

                      {errors.type === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.type}</FormFeedback>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      HML Category
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='hmlcategory'
                        value={values.hmlcategory}
                        onChange={handleChange}
                        invalid={errors.hmlcategory !== undefined}
                        onBlur={handleBlur}
                        valid={
                          errors.hmlcategory === undefined &&
                          touched.hmlcategory
                        }
                      />
                      {errors.hmlcategory === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.hmlcategory}</FormFeedback>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      Product Hierarchy
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='hierarchy'
                        value={values.hierarchy}
                        onChange={handleChange}
                        invalid={errors.hierarchy !== undefined}
                        onBlur={handleBlur}
                        valid={
                          errors.hierarchy === undefined && touched.hierarchy
                        }
                      />
                      {errors.hierarchy === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.hierarchy}</FormFeedback>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      SKU
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='sku'
                        value={values.sku}
                        onChange={handleChange}
                        invalid={errors.sku !== undefined}
                        onBlur={handleBlur}
                        valid={errors.sku === undefined && touched.sku}
                      />
                      {errors.sku === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.sku}</FormFeedback>
                      )}
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      MRP
                    </Label>
                    <InputGroup>
                      {' '}
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText className='suffixbtn'>₹</InputGroupText>
                      </InputGroupAddon>
                      <FastField
                        as={Input}
                        name='mrp'
                        value={values.mrp}
                        onChange={handleChange}
                        invalid={errors.mrp !== undefined}
                        onBlur={handleBlur}
                        valid={errors.mrp === undefined && touched.mrp}
                      />
                      {errors.mpr === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.mrp}</FormFeedback>
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
              </>
            )}
          </Formik>
        </ModalBody>
      </Modal>{' '}
      {console.log('row', row)}
    </>
  );
};

export default Item;
