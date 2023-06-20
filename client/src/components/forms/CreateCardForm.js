import React, { Fragment, useState } from 'react';

import Navbar from '../layout/Navbar';
import { createCard } from '../../actions/forms';
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
  FormCheck,
} from 'react-bootstrap';

const CreateCardForm = ({ createCard, alerts }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createCard(userId, status);
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
                <h1 className='mb-2'>Card Creation Form</h1>
                <Form onSubmit={formSubmit}>
                  <FormGroup className='mt-4'>
                    <FormLabel>User ID:</FormLabel>
                    <FormControl
                      type='text'
                      name='title'
                      placeholder='Ask admin for user id in order to create card.'
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='mt-2'>
                    <FormLabel>Status:</FormLabel>
                    <FormCheck
                      type='radio'
                      name='status'
                      id='status-lost'
                      label='Lost'
                      value='lost'
                      checked={status === 'lost'}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <FormCheck
                      type='radio'
                      name='status'
                      id='status-not-lost'
                      label='Not Lost'
                      value='not-lost'
                      checked={status === 'not-lost'}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <FormText className='text-muted'>
                      Choose status for created card.
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

CreateCardForm.propTypes = {
  createCard: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { createCard })(CreateCardForm);
