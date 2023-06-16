import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Badge,
} from 'react-bootstrap';

import { loadAllManagedDoors, changeCardStatus } from '../../actions/dashboard';

const EmployeeDashboard = ({
  loadAllManagedDoors,
  changeCardStatus,
  doors,
}) => {
  useEffect(() => {
    loadAllManagedDoors();
  }, [loadAllManagedDoors]);

  const handleStatusChange = (card) => {
    changeCardStatus(card);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={{ span: 12, offset: 0 }} className='mt-5'>
          <Card bg='white' className='py-2 px-4' style={{ overflowY: 'auto' }}>
            <Card.Body>
              <h1 className='mb-2'>Doors</h1>
              <h3 className='text-primary mb-5'>List of All Managed Doors</h3>
              <Container className='cards-container px-0'>
                <Row xs={1} md={1} lg={1} className='mx-0'>
                  {doors.map((door, index) => (
                    <Col key={index} className='mb-4 px-0'>
                      <Card>
                        <Card.Header className='pt-3'>
                          <Card.Title>
                            Door Number:{' '}
                            <span className='text-primary'>{door.number}</span>
                            <br />
                            <Badge variant='info' className='ml-2 mt-1'>
                              {door.cards.length} card(s)
                            </Badge>
                          </Card.Title>
                        </Card.Header>
                        <Accordion defaultActiveKey='0'>
                          {door.cards.map((card, cardIndex) => (
                            <Card key={cardIndex}>
                              <Accordion.Item
                                eventKey={`${index}-${cardIndex}`}
                              >
                                <Accordion.Header>
                                  {/* nbsp creates whitespace that doesnt get cutout*/}
                                  Card User:&nbsp;
                                  <span className='text-primary'>
                                    {card.user.name}
                                  </span>
                                </Accordion.Header>
                                <Accordion.Collapse
                                  eventKey={`${index}-${cardIndex}`}
                                >
                                  <Card.Body className='p-0'>
                                    <Container
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                      className='px-3'
                                    >
                                      <div>
                                        <div>
                                          Status:{' '}
                                          <span
                                            className={
                                              card.status === 'not lost'
                                                ? 'text-primary'
                                                : 'text-danger'
                                            }
                                          >
                                            {card.status}
                                          </span>
                                        </div>
                                        <div>
                                          Card ID:{' '}
                                          <span className='text-primary'>
                                            {card._id}
                                          </span>
                                        </div>
                                      </div>
                                      <Button
                                        onClick={() =>
                                          handleStatusChange(card)
                                        }
                                        className='mt-2'
                                        variant='outline-primary'
                                        size='sm'
                                      >
                                        Change status
                                      </Button>
                                    </Container>
                                    <Card.Footer className='mt-2'>
                                      Created At:{' '}
                                      <span className='text-primary'>
                                        {new Date(
                                          card.createdAt
                                        ).toLocaleDateString()}
                                      </span>
                                    </Card.Footer>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Accordion.Item>
                            </Card>
                          ))}
                        </Accordion>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {doors.length <= 0 && (
                  <div>
                    You don't manage any doors yet, ask administrator to assign
                    them to you 😎
                  </div>
                )}
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

EmployeeDashboard.propTypes = {
  changeCardStatus: PropTypes.func.isRequired,
  loadAllManagedDoors: PropTypes.func.isRequired,
  doors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  doors: state.dashboard.doors,
});

export default connect(mapStateToProps, { loadAllManagedDoors, changeCardStatus })(
  EmployeeDashboard
);
