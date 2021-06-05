import React from 'react';
import { Table, Input, Button } from 'reactstrap';
import './TableTax.css';
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
const TableTax = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  gotoPage,
  pageCount,
  setPageSize,
  prepareRow,
  pageIndex,
  pageSize,
  link,
  actionWidth,
}) => {
  return (
    <>
      <div className='tableDiv'>
        <Table {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={actionWidth ? 'columnWidth' : ''}>
                    {column.render('Header')}
                    <span>
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
              return link ? (
                <Link to={`/orderDetails/${i}`}>
                  <tr key={i} id={row.id} {...row.getRowProps()}>
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
                </Link>
              ) : (
                <tr key={i} id={row.id} {...row.getRowProps()}>
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
      </div>
      <div className='d-flex my-3 justify-content-end align-items-center'>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span className=' d-flex align-items-center'>
          | Go to page:{' '}
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
    </>
  );
};

export default TableTax;
