import React from 'react'
import { Container, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'

const TopNewsModal: React.FC = () => {
    const handleClose = () => {}
    return (
        <Modal show={true} onHide={handleClose} dialogClassName="modal-40w">
            <Modal.Header className="flex-column">
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>SeelingAlpha</div>
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>February 22, 2024</div>
            <div className="flex-grow-1 align-self-end" style={{fontSize: "10px", color: "blue"}}>
                <button className='modal-close'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <div>If you can Predict the cashflow you can Predict Stock Price - Austin Hankwitz</div>
                    </Row>
                    <Row>
                        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas suscipit sunt temporibus maxime reprehenderit rem quaerat corrupti ut, voluptates beatae necessitatibus repellat illum praesentium quia blanditiis quo ex facere consequuntur</div>
                    </Row>
                    <Row className="justify-content-center">
                        <div>
                            <span>For more details click <a href=''>here</a></span>
                        </div>
                    </Row>
                </Container>
                <Card>
                    <Card.Body>
                        Share
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
      );
}

export default TopNewsModal