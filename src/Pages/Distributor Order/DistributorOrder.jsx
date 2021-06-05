import { format, parseISO } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import { Container, Input, InputGroup } from 'reactstrap';
import { ORDER, ORDER_COLUMN } from '../../assets/Json/ORDER';
import TableTax from '../../components/Table/TableTax';
import '../../components/Table/TableTax.css';
const DistributorOrder = () => {
  const columns = useMemo(() => ORDER_COLUMN, []);
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [filterStartDate, setfilterStartDate] = useState('');
  console.log(filterStartDate);
  // const [filterEndDate, setfilterEndDate] = useState('');
  const data = useMemo(() => ORDER, []);
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
  const handleStateChange = (e, prop) => {
    const value = e.target.value || undefined;

    setFilter(prop, value);
  };

  const states = [...new Set(ORDER.map((x) => x.state))];
  const cities = [...new Set(ORDER.map((x) => x.city))];
  const startDat = (e) => {
    let startDate = e.target.value;
    setstartDate(startDate);
    let filterstartdate = format(parseISO(startDate), 'dd-MM-yyyy');
    setfilterStartDate(filterstartdate);
  };
  const endDat = (e) => {
    let endDate = e.target.value;
    setendDate(endDate);
    let filterEndDate = format(parseISO(startDate), 'dd-MM-yyyy');
    setfilterStartDate(filterEndDate);
  };
  return (
    <Container>
      <h4 className='pt-4 pb-5'>Ditributor's Order</h4>
      <div className='d-flex w-100 ml-3  mb-3'>
        <div className='d-flex flex-column mr-3 '>
          <span>State</span>
          <InputGroup size='sm'>
            <Input
              type='select'
              name='select'
              onChange={(e) => handleStateChange(e, 'state')}
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
        <div className='d-flex flex-column mr-3 '>
          <span>City</span>
          <InputGroup size='sm'>
            <Input
              type='select'
              name='select'
              onChange={(e) => handleStateChange(e, 'city')}
              id='exampleSelect'>
              <option value=''>All</option>
              {cities.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
            </Input>
          </InputGroup>
        </div>
        <div className='d-flex flex-column mr-3 '>
          <span>Date</span>
          <InputGroup size='sm'>
            <Input
              type='date'
              name='date'
              onChange={(e) => startDat(e)}
              placeholder='date placeholder'
              value={startDate}
            />
          </InputGroup>
        </div>
        <div className='d-flex flex-column mr-3 '>
          <span>Date</span>
          <InputGroup size='sm'>
            <Input
              type='date'
              name='date'
              onChange={(e) => endDat(e)}
              placeholder='date placeholder'
              value={endDate}
              min={startDate}
            />
          </InputGroup>
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
        link={true}
      />
    </Container>
  );
};

export default DistributorOrder;
