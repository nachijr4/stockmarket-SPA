import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import SVGComponent from './utilities/SVGComponent'
import '../styles/watchlist.css'

const generateCard:Function = () => {
    return (
        <Row className="mb-2">
                <Card className="p-0">
                    <Card.Body className="py-2">
                        <Row className="pb-2">
                            <button className='remove-watchlist'>
                                <SVGComponent symbol="cross" height='10px' width="10px"/>
                            </button>
                        </Row>
                        <Row className="pb-1">
                            <Col className="watchlist-companyname">NVDA</Col>
                            <Col className='text-success watchlist-price'>777.83</Col>
                        </Row>
                        <Row className="pb-2">
                            <Col>NVIDIA Corp</Col>
                            <Col className='text-success d-flex'>
                                <SVGComponent height='10px' width='10px' symbol="caratUp"/>
                                <span className='watchlist-change ps-1'>102.66 (15.22%)</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
    )
}

const WatchlistPage: React.FC = () => {

    return (
        <Container className='col-md-8 mx-auto'>
            <Row className="my-4">
                <div className='p-0 watchlist-title'>My Watchlist</div>
            </Row>
            {
            generateCard()}
            {generateCard()
            }
        </Container>
    )
}

export default WatchlistPage