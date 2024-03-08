import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'

const StockModal: React.FC = () => {
    const handleClose = () => {}
    return (
        <Modal show={false} onHide={handleClose}>
            <Modal.Header className="flex-column">
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>AAPL</div>
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
                        <Col xs="auto" className="p-0">Current Price: &nbsp;</Col>
                        <Col xs="auto" className="p-0">184.23</Col>
                    </Row>
                    <Row>
                        <Col xs="auto" className="p-0">Money in Wallet: &nbsp;</Col>
                        <Col xs="auto" className="p-0">$25000.00</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="p-0 align-self-center">Quantity: &nbsp;</Col>
                        <Col xs="auto" className="pr-3 flex-grow-1"><input className="form-control" style={{height: "30px"}} type="number"/></Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <div><span>Total:&nbsp;</span><span>0.00</span></div>
            <Button variant="success" onClick={handleClose}>
                Buy
            </Button>
            </Modal.Footer>
        </Modal>
      );
}

export default StockModal