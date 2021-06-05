import React from 'react';
import './MenuItem.css';
import { Card, CardBody, CardImg, CardTitle, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const MenuItem = ({ image, title, link }) => {
  return (
    <>
      <Link to={link}>
        <Col lg={2} md={2}>
          <Card className='card'>
            <div className='cardContainer'>
              <CardImg
                className='img'
                top
                width='100%'
                src={image}
                alt={title}
              />
            </div>
            <CardBody>
              <div className='titleContainer'>
                <CardTitle className='titles'>{title}</CardTitle>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Link>
    </>
  );
};

export default MenuItem;
