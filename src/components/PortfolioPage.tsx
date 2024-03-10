import React from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import SVGComponent from './utilities/SVGComponent'
import '../styles/watchlist.css'

const generateCard:Function = () => {

    const btnStyle = {
        height: "28px",
        fontSize: '12px',
        paddingLeft: "12px",
        paddingRight: "12px"
    }

    return (
        <Row className="mb-2">
                <Card className="p-0">
                    <Card.Header>
                        <span className="fw-bold fw-500 fs-5">AAPL</span> &nbsp;
                        <span className="text-secondary fw-500">Apple Inc</span>
                    </Card.Header>
                    <Card.Body className="py-2">
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col md={6} className="fw-500">Quantity:</Col>
                                    <Col md={6} className='ff-arimo fw-500'>3.00</Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="fw-500">Avg. Cost / Share:</Col>
                                    <Col md={6} className='ff-arimo fw-500'>184.23</Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="fw-500">Total Cost:</Col>
                                    <Col md={6} className="ff-arimo fw-500">552.69</Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                            <Row>
                                    <Col md={6} className="fw-500">Change:</Col>
                                    <Col md={6} className='d-flex justify-content-start text-danger'>
                                        <SVGComponent symbol="caratDown" />
                                        <span className="ff-arimo fw-500">-0.10</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="fw-500">Current Price:</Col>
                                    <Col md={6} className="text-danger ff-arimo fw-500">184.13</Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="fw-500">Market Value:</Col>
                                    <Col md={6} className="text-danger ff-arimo fw-500">552.40</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-start py-1 px-2">
                        <button type="button" className="btn btn-primary btn-sm py-0" style={btnStyle}>Buy</button>
                        <button type="button" className="btn btn-danger btn-sm ml-2 py-0" style={btnStyle}>Sell</button>
                    </Card.Footer>
                </Card>
            </Row>
    )
}

const PortfolioPage: React.FC = () => {
    const walletStyle = {
        fontWeight: 500,
        fontSize: "18px",
        letterSpacing: "0.5px",
        color: "#4b4a4a"
        }
    return (
        <Container className='col-md-8 mx-auto'>
            <Row className="my-4 mb-2">
                <div className='p-0 watchlist-title mb-2'>My Portfolio</div>
                <div className='p-0' style={walletStyle}>Money in Wallet: $22484.40</div>
            </Row>
            {
            generateCard()}
            {generateCard()
            }
        </Container>
    )
}

export default PortfolioPage