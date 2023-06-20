import React, { Fragment, useState } from 'react';

import Navbar from '../layout/Navbar';
import { assignCard } from '../../actions/forms';
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

const AssignCardForm = ({ assignCard, alerts }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doorNumber, setDoorNumber] = useState('');
  const [cardId, setCardId] = useState('');

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await assignCard(doorNumber, cardId);
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
                <h1 className='mb-2'>Door Assignment Form</h1>
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
                    <FormLabel>Card id:</FormLabel>
                    <FormControl
                      type='text'
                      name='duration'
                      placeholder='ID'
                      value={cardId}
                      onChange={(e) => setCardId(e.target.value)}
                    />
                    <FormText className='text-muted'>
                      Enter card id that will be assigned to the door
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

AssignCardForm.propTypes = {
  assignCard: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { assignCard })(AssignCardForm);
