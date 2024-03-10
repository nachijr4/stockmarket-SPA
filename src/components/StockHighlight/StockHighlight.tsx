import React, {useState} from 'react'
import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import Star from '../../images/star.svg'
import './stockhighlight.css'
import SVGComponent from '../utilities/SVGComponent';
import StockModal from '../Modals/StockModal'

const StockHighlight: React.FC = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={4} className='text-center'>
                        <div className='d-flex align-items-center justify-content-center ticker'>
                            <span>AAPL</span> 
                            <img src={Star} className="ml-2 pb-1"/>
                        </div>
                        <div className="company-name">Apple Inc </div>
                        <div className='exchange'>Nasdaq Inc - GLOBAL MARKET</div>
                        <div className="mt-1">
                            <Button className="buy mr-2" variant="success">Buy</Button>
                            <Button className="buy mr-2" variant="danger">Sell</Button>
                        </div>
                    </Col>
                    <Col md={4} className="text-center d-flex align-items-center flex-column">
                        <div className="mb-auto">
                            <img className="company-logo" height="75px" src="https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg" />
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        <div className="stock-price">
                            <div className="text-success price"><span>180.85</span></div>
                            <div className="change d-flex align-items-center justify-content-center text-success">
                                <SVGComponent className="" symbol="caratUp" />
                                <span className="ml-1">1.83 (1.00%)</span>
                            </div>
                            <div className="timestamp">2024-03-04 10.53.22</div>
                        </div>
                    </Col>
                </Row>
                <Row className="text-center">
                    <div className="text-success market-state my-3">
                        Market is Open
                    </div>
                    </Row>
            </Container>
            <StockModal />
        </>
        
    );
}

export default StockHighlight