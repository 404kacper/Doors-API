import React, { Fragment, useState } from 'react';

import Navbar from '../layout/Navbar';
import { createDoor } from '../../actions/forms';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormText,
} from 'react-bootstrap';

const CreateDoorForm = ({ createDoor, alerts }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doorNumber, setDoorNumber] = useState('');
  const [managerId, setCardId] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createDoor(doorNumber, managerId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Navbar bgClass='bg-dark' />
      <Container className='mt-5'>
        <Row>
          <Col md={8} className='m-auto'>
            <Card className='bg-white py-2 px-4'>
              <Card.Body>
                <Link
                  to={!isSubmitting ? '/dashboard' : '#'}
                  className={`btn btn-link text-secondary my-3 px-0 ${
                    isSubmitting && 'disabled'
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  <i className='fas fa-chevron-left'></i> Go to Dashboard
                </Link>
                <h1 className='mb-2'>Door Creation Form</h1>
                <Form onSubmit={formSubmit}>
                  <FormGroup className='mt-4'>
                    <FormLabel>Door:</FormLabel>
                    <FormControl
                      type='text'
                      name='title'
                      placeholder='Number'
                      value={doorNumber}
                      onChange={(e) => setDoorNumber(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='mt-2'>
                    <FormLabel>Manager ID:</FormLabel>
                    <FormControl
                      type='text'
                      name='duration'
                      placeholder='ID'
                      value={managerId}
                      onChange={(e) => setCardId(e.target.value)}
                    />
                    <FormText className='text-muted'>
                      Enter manager id to assign to given door number.
                    </FormText>
                  </FormGroup>
                  {alerts !== null &&
                    alerts.length > 0 &&
                    alerts.map((alert) => (
                      <Alert
                        key={alert.id}
                        alertType={alert.alertType}
                        msg={alert.msg}
                      />
                    ))}
                  <FormGroup className='mt-5'>
                    <Button type='submit' variant='dark' className='w-100'>
                      Apply changes
                    </Button>
                  </FormGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

CreateDoorForm.propTypes = {
  createDoor: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { createDoor })(CreateDoorForm);