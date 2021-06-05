import React from 'react';
import './Home.css';
import { Row } from 'reactstrap';
import { data as Data } from '../../assets/Json/data';
import MenuItem from '../../containers/MenuItem/MenuItem';
const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='menuitems'>
          <h3 className='heading'>Menu</h3>
          <Row>
            {Data.map((data, index) => {
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

export default Home;
