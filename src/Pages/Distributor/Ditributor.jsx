import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TableC } from '../../components/Table/TableC';

const Distributor = () => {
  const [distributors, setdistributors] = useState('');
  const [states, setstates] = useState([]);
  const LoadDistributor = useCallback(async () => {
    const result = await axios.get('http://localhost:3003/distributors');
    setstates([...new Set(result.data.map((x) => x.state))]);
    setdistributors(result.data);
  }, [distributors]);
  const deleteUser = useCallback(
    async (e, rowIdx) => {
      e.preventDefault();
      await axios
        .delete(`http://localhost:3003/distributors/${rowIdx}`)
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
      LoadDistributor();
    },
    [LoadDistributor]
  );
  useEffect(() => {
    LoadDistributor();
  }, []);
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
          const rowIdx = props.row.original.id;

          return (
            <div className='d-flex justify-content-around'>
              <span
                onClick={(e) => {
                  deleteUser(e, rowIdx);
                }}>
                <FontAwesomeIcon className='icon' icon={faEye} />
              </span>

              <span onClick={() => {}}>
                <FontAwesomeIcon className='icon' icon={faTrash} />
              </span>
            </div>
          );
        },
      },
    ],
    [deleteUser]
  );

  const columns = useMemo(() => DEALERS_COLUMN, [DEALERS_COLUMN]);
  const data = useMemo(() => distributors, [distributors]);
  return distributors === '' ? (
    <div></div>
  ) : (
    <TableC
      columns={columns}
      searchTitle='Distributor'
      searchPlaceHolder='Search Distributor'
      dropdownList={states}
      data={data}
      heading="Distributor's List"
      filter='name'
      dropfilter='state'
      reload={LoadDistributor}
    />
  );
};

export default Distributor;
