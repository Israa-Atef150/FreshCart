import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import image1 from '../../Assets/Images/abdulrahman.jpg';
import image2 from '../../Assets/Images/esraa.jpeg';
import image3 from '../../Assets/Images/ahmed.jpg';
import image4 from '../../Assets/Images/nadra.jpg';
import image5 from '../../Assets/Images/mohamed.jpeg';
import image6 from '../../Assets/Images/mariam.jpeg';

const MeetOur = () => {
  const teachers = [
    { name: 'Abdul Rahman ', image: image1 },
    { name: 'Israa Atef', image: image2 },
    { name: 'Ahmed', image: image3 },
    { name: 'Nadra', image: image4 },
    { name: 'Mohamed', image: image5 },
    { name: 'Maryem', image: image6 }
  ]

  return (
    <Container className="text-center my-5">
      <h2>MEET & OUR</h2>
      <Row className="justify-content-center">
        {teachers.map((teacher, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card style={{ width: '18rem' }} className="mx-2 my-2">
              <Card.Img variant="top" src={teacher.image} style={{ width: '18rem', height: '300px' }}/>
              <Card.Body>
                <Card.Title>{teacher.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MeetOur