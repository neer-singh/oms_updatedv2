import React from 'react';
import { Container, FormGroup, Input, Label } from 'reactstrap';
import './InventoryVisibility.css';
const InventoryVisibility = () => {
  return (
    <Container>
      <h4 className='pt-4 pb-5'>Inventory Visibility</h4>
      <div className='d-flex w-100 h-100'>
        <div className='w-25 h-100'>
          <div className='d-flex w-100 justify-content-center'>
            <h6>Category</h6>
          </div>
          <div className='w-100 px-3 pt-3 column1'>
            <FormGroup check>
              <Label check>
                <Input type='checkbox' /> Mattress
              </Label>
            </FormGroup>
          </div>
        </div>
        <div className='d-flex w-75 h-100 ml-2'>
          <div className='w-100 mr-2 h-100'>
            <div className='d-flex justify-content-center'>
              <h6>Product Category</h6>
            </div>
            <div className='px-3 mb-2 py-5 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> DUROPEDIC MATTRESSES
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 py-5 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> ENERGISE MATTRESSES
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 py-5 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> ESSENTIAL MATTRESS
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 py-5 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> NATURAL LIVING MATTRESS
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className='w-100 mr-1 h-100'>
            <div className='d-flex justify-content-center'>
              <h6>Product Type</h6>
            </div>
            <div className='px-3 mb-2 pt-2 pb-3 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> PUF MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> POCKET SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> BONNEL SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> RC MATTRESSES
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 pt-2 pb-3 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> PUF MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> POCKET SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> BONNEL SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> RC MATTRESSES
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 pt-2 pb-3 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> PUF MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> POCKET SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> BONNEL SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> RC MATTRESSES
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 mb-2 pt-2 pb-3 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> PUF MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> POCKET SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> BONNEL SPRING MATTRESS
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> RC MATTRESSES
                </Label>
              </FormGroup>
            </div>
          </div>
          <div className='w-100 mr-1 h-100'>
            <div className='d-flex justify-content-center'>
              <h6>HML Category</h6>
            </div>
            <div className='px-3 py-4 mb-2 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> HIGH
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> MID
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' />
                  LOW
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 py-4 mb-2 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> HIGH
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> MID
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' />
                  LOW
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 py-4 mb-2 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> HIGH
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> MID
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' />
                  LOW
                </Label>
              </FormGroup>
            </div>
            <div className='px-3 py-4 mb-2 back_color'>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> HIGH
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' /> MID
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type='checkbox' />
                  LOW
                </Label>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InventoryVisibility;
