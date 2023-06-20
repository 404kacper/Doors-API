import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {
  loadAllDoors,
  loadAllCards,
  loadAllUsers,
} from '../../actions/dashboard';

const AdminDashboard = ({
  loadAllDoors,
  loadAllCards,
  loadAllUsers,
  doors,
  cards,
  users,
}) => {
  useEffect(() => {
    loadAllDoors();
    loadAllCards();
    loadAllUsers();
  }, [loadAllDoors, loadAllCards, loadAllUsers]);

  const getAssignedCardIds = (door) => {
    const assignedCards = cards.filter(
      (card) => card.door && card.door.number === door.number
    );

    if (!assignedCards.length) {
      return <span className='text-danger'>No cards assigned</span>;
    }

    return (
      <>
        Cards assigned:{' '}
        {assignedCards.map((card, i) => (
          <React.Fragment key={i}>
            <span className='text-primary'>{card._id}</span>
            {i < assignedCards.length - 1 ? ', ' : ''}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={{ span: 12, offset: 0 }}>
          {/* Doors */}
          <Card bg='white' className='py-2 px-4 mb-5'>
            <Card.Body>
              <h1 className='mb-2'>Doors</h1>
              <h3 className='text-primary mb-5'>List of All Doors</h3>
              <Container
                className='doors-container px-0'
                style={{ overflowY: 'scroll', maxHeight: '400px' }}
              >
                <Row xs={1} md={1} lg={1} className='mx-0'>
                  {doors.map((door, index) => (
                    <Col key={index} className='mb-4 px-0'>
                      <Card>
                        <Card.Header>
                          <Card.Title>
                            Door:{' '}
                            <span className='text-primary'>{door.number}</span>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Manager:{' '}
                            <span className='text-primary'>
                              {door.manager.name}
                            </span>
                            <br />
                            Manager role:{' '}
                            <span className='text-primary'>
                              {door.manager.role}
                            </span>
                            <br />
                            Contact:{' '}
                            <span className='text-primary'>
                              {door.manager.email}
                            </span>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>{getAssignedCardIds(door)}</Card.Footer>
                      </Card>
                    </Col>
                  ))}
                  {doors.length <= 0 && (
                    <div>No doors available in the system 😐</div>
                  )}
                </Row>
              </Container>
            </Card.Body>
          </Card>

          {/* Cards */}
          <Card bg='white' className='py-2 px-4 mb-5'>
            <Card.Body>
              <h1 className='mb-2'>Cards</h1>
              <h3 className='text-primary mb-5'>List of All Cards</h3>
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
                            Card: <span className='text-primary'>{index}</span>
                          </Card.Title>
                          <Card.Subtitle className='mb-2 text-muted'>
                            Card ID: {card._id}
                          </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            {card.door && card.door.number && (
                              <>
                                {'Access to door: '}
                                <span className='text-primary'>
                                  {card.door.number}
                                </span>
                                <br />
                              </>
                            )}
                            Assigned to:{' '}
                            <span className='text-primary'>
                              {card.user.name}
                            </span>
                            <br />
                            {card.manager && (
                              <>
                                Manager ID:{' '}
                                <span className='text-primary'>
                                  {card.manager._id}
                                </span>
                                <br />
                                Manager Name:{' '}
                                <span className='text-primary'>
                                  {card.manager.name}
                                </span>
                              </>
                            )}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          Status:{' '}
                          <span
                            className={
                              card.status === 'lost'
                                ? 'text-danger'
                                : 'text-primary'
                            }
                          >
                            {card.status}
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                  {cards.length <= 0 && (
                    <div>No cards available in the system 😐</div>
                  )}
                </Row>
              </Container>
            </Card.Body>
          </Card>

          {/* Users */}
          <Card bg='white' className='py-2 px-4'>
            <Card.Body>
              <h1 className='mb-2'>Users</h1>
              <h3 className='text-primary mb-5'>List of All Users</h3>
              <Container
                className='users-container px-0'
                style={{ overflowY: 'scroll', maxHeight: '400px' }}
              >
                <Row xs={1} md={1} lg={1} className='mx-0'>
                  {users.map((user, index) => (
                    <Col key={index} className='mb-4 px-0'>
                      <Card>
                        <Card.Header>
                          <Card.Title>
                            User:{' '}
                            <span className='text-primary'>{user.name}</span>
                          </Card.Title>
                          <Card.Subtitle className='mb-2 text-muted'>
                            User ID: {user._id}
                          </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Email:{' '}
                            <span className='text-primary'>{user.email}</span>
                            <br />
                            Role:{' '}
                            <span className='text-primary'>{user.role}</span>
                            <br />
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          Created at:{' '}
                          <span className='text-primary'>
                            {new Date(user.createdAt).toLocaleString()}
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                  {users.length <= 0 && (
                    <div>No users available in the system 😐</div>
                  )}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AdminDashboard.propTypes = {
  loadAllCards: PropTypes.func.isRequired,
  loadAllUsers: PropTypes.func.isRequired,
  loadAllDoors: PropTypes.func.isRequired,
  doors: PropTypes.arrayOf(PropTypes.object).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  doors: state.dashboard.doors,
  cards: state.dashboard.cards,
  users: state.dashboard.users,
});

export default connect(mapStateToProps, {
  loadAllDoors,
  loadAllCards,
  loadAllUsers,
})(AdminDashboard);
