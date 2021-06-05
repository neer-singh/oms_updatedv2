import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FastField, Formik } from 'formik';
import * as yup from 'yup';
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
import TableTax from '../../components/Table/TableTax';
const initialValues = { id: '', code: '', gst: '', from: '', to: '' };
const initialValuess = {
  id: '',
  code: '',
  gst: '',
  rangeFrom: '',
  rangeTo: '',
  validFrom: '',
  validTill: '',
};

const Tax = () => {
  const [transition, settransition] = useState(false);
  const [taxValues, setTaxValues] = useState([initialValues]);
  const [editTransitionModel, setEditTransitionModel] = useState(false);
  const [createTransionModel, setcreateTransionModel] = useState(false);
  const [createPerUnitModel, setCreatePerUnitModel] = useState(false);
  const [editPerUnitModel, setEditPerUnitModel] = useState(false);
  const [row, setRow] = useState('');
  const toggle = () => {
    editTransitionModel
      ? setEditTransitionModel(!editTransitionModel)
      : setcreateTransionModel(!createTransionModel);
  };
  const togglePerUnit = () => {
    editPerUnitModel
      ? setEditPerUnitModel(!editPerUnitModel)
      : setCreatePerUnitModel(!createPerUnitModel);
  };
  const loadTax = useCallback(async () => {
    transition
      ? await axios.get('http://localhost:3003/perUnit').then((response) => {
          setTaxValues(response.data);
          setTaxHeaders(TAX_PER_UNIT_COLUMN);
          return null;
        })
      : await axios
          .get('http://localhost:3003/transitionValue')
          .then((response) => {
            setTaxValues(response.data);
            setTaxHeaders(TAX_TRANSITION_VALUE_COLUMN);
            return null;
          })
          .catch((error) => console.log(error));
  }, [transition]);
  const deleteRatePerUnit = useCallback(
    async (props) => {
      const rowid = props.id;
      await axios
        .delete(`http://localhost:3003/perUnit/${rowid}`)
        .then((response) => {
          loadTax();
          return null;
        })
        .catch((error) => {
          console.log('catch error', error);
        });
    },
    [loadTax]
  );
  const TAX_PER_UNIT_COLUMN = useMemo(
    () => [
      {
        Header: 'HSN Code',
        accessor: 'code',
      },
      {
        Header: 'Range From',
        accessor: 'rangeFrom',
      },
      {
        Header: 'Range To',
        accessor: 'rangeTo',
      },
      {
        Header: 'GST',
        accessor: 'gst',
      },

      {
        Header: 'Valid From',
        accessor: 'validFrom',
      },

      { Header: 'Valid Till', accessor: 'validTill' },

      {
        Header: 'Actions',
        accessor: 'action',
        disableSortBy: true,
        Cell: (props) => {
          const row = props.row.original;
          return (
            <>
              <span
                onClick={() => {
                  deleteRatePerUnit(row);
                }}>
                <Button className='button delete'>Delete</Button>
              </span>

              <span
                onClick={() => {
                  setEditPerUnitModel(!editPerUnitModel);
                  setRow(row);
                }}>
                <Button className='button edit ml-4'>Edit</Button>
              </span>
            </>
          );
        },
      },
    ],
    [editPerUnitModel, deleteRatePerUnit]
  );

  const TAX_TRANSITION_VALUE_COLUMN = [
    {
      Header: 'HSN Code',
      accessor: 'code',
    },

    {
      Header: 'GST',
      accessor: 'gst',
    },

    {
      Header: 'From',
      accessor: 'from',
    },

    { Header: 'To', accessor: 'to' },

    {
      Header: 'Actions',
      accessor: 'action',
      disableSortBy: true,
      width: 200,
      Cell: (props) => {
        const rowIdx = props.row.original;
        return (
          <>
            <span
              onClick={() => {
                deleteTransition(rowIdx);
              }}>
              <Button className='button delete'>Delete</Button>
            </span>

            <span
              onClick={() => {
                setEditTransitionModel(!editTransitionModel);
                setRow(rowIdx);
              }}>
              <Button className='button edit ml-4'>Edit</Button>
            </span>
          </>
        );
      },
    },
  ];
  const [taxHeaders, setTaxHeaders] = useState(TAX_TRANSITION_VALUE_COLUMN);

  useEffect(() => {
    loadTax();
  }, [loadTax]);
  const columns = useMemo(() => taxHeaders, [taxHeaders]);
  const data = useMemo(() => taxValues, [taxValues]);
  const [filterInput, setFilterInput] = useState('');
  const validationSchema = yup.object().shape({
    code: yup.string().required(),
    gst: yup.number().required(),
    from: yup.number().required(),
    to: yup.number().required(),
  });

  const validationSchemas = yup.object().shape({
    code: yup.string().required(),
    gst: yup.number().required(),
    rangeFrom: yup.number().required(),
    rangeTo: yup.number().required(),
    validFrom: yup.string().required(),
    validTill: yup.string().required(),
  });
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
  const { pageIndex, pageSize } = state;
  const handleSelectFilterChange = (e) => {
    const value = e.target.value === 'true' ? true : false;
    settransition(value);
    loadTax();
  };
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;

    setFilter('code', value);
    setFilterInput(value);
  };
  const deleteTransition = async (props) => {
    const rowid = props.id;
    await axios
      .delete(`http://localhost:3003/transitionValue/${rowid}`)
      .then((response) => {
        loadTax();
        return null;
      })
      .catch((error) => {
        console.log('catch error', error);
      });
  };

  const onEditTransitionSubmit = async (props) => {
    const rowid = props.id;
    await axios
      .put(`http://localhost:3003/transitionValue/${rowid}`, props)
      .then((response) => {
        setEditTransitionModel(false);
        loadTax();
        return null;
      })
      .catch((error) => console.log(error));
  };
  const createTransionSubmit = async (props) => {
    await axios
      .post('http://localhost:3003/transitionValue', props)
      .then((response) => {
        setcreateTransionModel(false);
        loadTax();
        return null;
      });
  };
  const onEditPerUnitSubmit = async (props) => {
    const rowid = props.id;
    await axios
      .put(`http://localhost:3003/perUnit/${rowid}`, props)
      .then((response) => {
        setEditPerUnitModel(false);
        loadTax();
        return null;
      })
      .catch((error) => console.log(error));
  };
  const createPerUnitSubmit = async (props) => {
    await axios
      .post('http://localhost:3003/perUnit', props)
      .then((response) => {
        setCreatePerUnitModel(false);
        loadTax();
        return null;
      });
  };
  return (
    <Container>
      <h4 className='pt-4 pb-5'>Tax</h4>
      <div className='d-flex ml-3  mb-3'>
        <div className='d-flex flex-column mr-3 w-100'>
          <span>HSN Code</span>
          <InputGroup size='sm'>
            <Input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder='Search by HSN Code'
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
            <Input type='select' onChange={(e) => handleSelectFilterChange(e)}>
              {[
                { name: 'Transition Value', value: false },
                { name: 'Per-Unit', value: true },
              ].map((data, index) => {
                return (
                  <option value={data.value} key={index}>
                    {data.name}
                  </option>
                );
              })}
            </Input>
          </InputGroup>
        </div>
        <div className='d-flex w-100 createitem'>
          <Button
            onClick={() => {
              createPerUnitModel ? toggle() : togglePerUnit();
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
        actionWidth={true}
      />
      <Modal
        isOpen={editTransitionModel ? editTransitionModel : createTransionModel}
        toggle={toggle}>
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
          <Formik
            initialValues={editTransitionModel ? row : initialValues}
            validationSchema={validationSchema}
            onSubmit={
              editTransitionModel
                ? (props) => onEditTransitionSubmit(props)
                : (props) => createTransionSubmit(props)
            }
            isInitialValid={() => validationSchema.isValidSync(initialValues)}>
            {({
              values,
              errors,
              isValid,
              handleBlur,
              handleChange,
              handleSubmit,
              dirty,
              touched,
            }) => (
              <>
                <div className='d-flex justify-content-center w-100 mb-2'>
                  {editTransitionModel ? <h4>Edit</h4> : <h4>Add</h4>}
                </div>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      Code
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='code'
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.code !== undefined}
                        valid={errors.code === undefined && touched.code}
                      />
                      {errors.code === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.code}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      GST
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='gst'
                        value={values.gst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.gst !== undefined}
                        valid={errors.gst === undefined && touched.gst}
                      />
                      {errors.gst === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.gst}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      From
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='from'
                        value={values.from}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.from !== undefined}
                        valid={errors.from === undefined && touched.from}
                      />
                      {errors.from === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.from}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      To
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='to'
                        value={values.to}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.to !== undefined}
                        valid={errors.to === undefined && touched.to}
                      />
                      {errors.to === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.to}</FormFeedback>
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
      </Modal>
      <Modal isOpen={editPerUnitModel ? editPerUnitModel : createPerUnitModel}>
        <ModalHeader
          toggle={togglePerUnit}
          close={
            <FontAwesomeIcon
              onClick={togglePerUnit}
              className='model_close_btn'
              icon={faTimes}
            />
          }></ModalHeader>
        <ModalBody>
          <Formik
            initialValues={editPerUnitModel ? row : initialValuess}
            validationSchema={validationSchemas}
            onSubmit={
              editPerUnitModel
                ? (props) => onEditPerUnitSubmit(props)
                : (props) => createPerUnitSubmit(props)
            }
            isInitialValid={() =>
              validationSchemas.isValidSync(initialValuess)
            }>
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
                  {editPerUnitModel ? <h4>Edit</h4> : <h4>Add</h4>}
                </div>
                <Form className='form' onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='Distributor' className='region'>
                      Code
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='code'
                        value={values.code}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.code !== undefined}
                        valid={errors.code === undefined && touched.code}
                      />
                      {errors.code === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.code}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      GST
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='gst'
                        value={values.gst}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.gst !== undefined}
                        valid={errors.gst === undefined && touched.gst}
                      />
                      {errors.gst === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.gst}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      Range From
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='rangeFrom'
                        value={values.rangeFrom}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.rangeFrom !== undefined}
                        valid={
                          errors.rangeFrom === undefined && touched.rangeFrom
                        }
                      />
                      {errors.rangeFrom === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.rangeFrom}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      rangeTo
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='rangeTo'
                        value={values.rangeTo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.rangeTo !== undefined}
                        valid={errors.rangeTo === undefined && touched.rangeTo}
                      />
                      {errors.rangeTo === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.rangeTo}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      Valid From
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='validFrom'
                        value={values.validFrom}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.validFrom !== undefined}
                        valid={
                          errors.validFrom === undefined && touched.validFrom
                        }
                      />
                      {errors.validFrom === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.validFrom}</FormFeedback>
                      )}
                    </InputGroup>
                    <Label for='Distributor' className='region'>
                      validTill
                    </Label>
                    <InputGroup>
                      <FastField
                        as={Input}
                        name='validTill'
                        value={values.validTill}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isValid={errors.validTill !== undefined}
                        valid={
                          errors.validTill === undefined && touched.validTill
                        }
                      />
                      {errors.validTill === undefined ? (
                        <FormFeedback></FormFeedback>
                      ) : (
                        <FormFeedback>{errors.validTill}</FormFeedback>
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
      </Modal>
    </Container>
  );
};

export default Tax;
