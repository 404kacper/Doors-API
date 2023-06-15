import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { loadDoors, loadCards } from '../../actions/dashboard';

const GuestDashboard = ({ loadDoors, loadCards, doors, cards }) => {
  useEffect(() => {
    loadCards();
    loadDoors();
  }, [loadDoors, loadCards]);
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={{ span: 12, offset: 0 }}>
          <Card bg='white' className='py-2 px-4'>
            <Card.Body>
              <h1 className='mb-1'>Doors</h1>
              <h3 className='text-primary mb-5'>List of All Doors</h3>
              <Container
                className='doors-container px-0'
                style={{ overflowY: 'scroll', maxHeight: '400px' }}
              >
                <Row xs={1} md={2} lg={4} className='mx-0'>
                  {doors.map((door, index) => (
                    <Col
                      key={index}
                      className='mb-4'
                      style={{ paddingLeft: 0 }}
                    >
                      <Card
                        bg={
                          cards.some((card) => card.door.number === door.number)
                            ? 'primary'
                            : 'white'
                        }
                      >
                        <Card.Header>
                          Manager:{' '}
                          <span
                            className={
                              cards.some(
                                (card) => card.door.number === door.number
                              )
                                ? 'text-white'
                                : 'text-primary'
                            }
                          >
                            {door.manager.name}
                          </span>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            Door:{' '}
                            <span
                              className={
                                cards.some(
                                  (card) => card.door.number === door.number
                                )
                                  ? 'text-white'
                                  : 'text-primary'
                              }
                            >
                              {door.number}
                            </span>
                          </Card.Title>
                          <Card.Text>
                            Manager role:{' '}
                            <span
                              className={
                                cards.some(
                                  (card) => card.door.number === door.number
                                )
                                  ? 'text-white'
                                  : 'text-primary'
                              }
                            >
                              {door.manager.role}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <p className='text-muted'>
                  Doors you have access to will be highlighted in{' '}
                  <span className='text-primary'>color</span>
                </p>
                {doors.length <= 0 && 
                <div>No doors available in the system 😐</div>
                }
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ span: 12, offset: 0 }} className='mt-5'>
          <Card bg='white' className='py-2 px-4'>
            <Card.Body>
              <h1 className='mb-2'>Cards</h1>
              <h3 className='text-primary mb-5'>List of All Your Cards</h3>
              <Container
                className='cards-container px-0'
                style={{ overflowY: 'scroll', maxHeight: '400px' }}
              >
                <Row xs={1} md={1} lg={1} className='mx-0'>
                  {cards.map((card, index) => (
                    <Col key={index} className='mb-4 px-0'>
                      <Card>
                        <Card.Header>
                          <Card.Title>
                            Card To Door:{' '}
                            <span className='text-primary'>
                              {card.door.number}
                            </span>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Assigned manager:{' '}
                            <span className='text-primary'>
                              {card.door.manager.name}
                            </span>
                            <br />
                            Contact:{' '}
                            <span className='text-primary'>
                              {card.door.manager.email}
                            </span>
                            <br/>
                            <b>
                              Status:{' '}
                              <span className='text-primary'>
                                {card.status}
                              </span>
                              <br />
                            </b>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          Created At:{' '}
                          <span className='text-primary'>
                            {new Date(card.createdAt).toLocaleDateString()}
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {cards.length <= 0 && 
                <div>You don't own any cards yet 🤐</div>
                }
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

GuestDashboard.propTypes = {
  loadDoors: PropTypes.func.isRequired,
  loadCards: PropTypes.func.isRequired,
  doors: PropTypes.arrayOf(PropTypes.object).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  doors: state.dashboard.doors,
  cards: state.dashboard.cards,
});

export default connect(mapStateToProps, { loadDoors, loadCards })(
  GuestDashboard
);
