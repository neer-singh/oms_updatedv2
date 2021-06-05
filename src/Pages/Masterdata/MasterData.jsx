import React from 'react';
import '../Home/Home.css';
import { Row } from 'reactstrap';
import { masterData } from '../../assets/Json/data';
import MenuItem from '../../containers/MenuItem/MenuItem';
const MasterData = () => {
  return (
    <>
      <div className='container'>
        <div className='menuitems'>
          <h3 className='heading'>Master Data</h3>
          <Row>
            {masterData.map((data, index) => {
              return (
                <MenuItem
                  key={index}
                  image={data.image}
                  title={data.title}
                  link={data.link}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default MasterData;
