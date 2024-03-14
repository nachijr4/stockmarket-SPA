import React, {useEffect, useState} from 'react'
import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import Star from '../../images/star.svg'
import './stockhighlight.css'
import SVGComponent from '../utilities/SVGComponent';
import StockModal from '../Modals/StockModal'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import DynamicStockPrice from './DynamicStockPrice';
import { formatDate } from '../../utilities';
import { fetchQuoteData, fetchStockData } from '../../store/StockSlice';


const StockHighlight: React.FC = () => {
    const dispatch = useAppDispatch()
    const companyProfile = useAppSelector(state => state.stock.data.companyProfile)
    const quote = useAppSelector(state => state.stock.data.quote)
    var marketTime = new Date(), marketOpen;
    if(quote !== undefined) {
    marketTime = new Date(quote.t * 1000)
    const currentDate = new Date()
    marketOpen = (currentDate.getTime() - marketTime.getTime()) / 1000 > 300? false : true
    }
    useEffect(() => {
        console.log("Interval has been set")
        const intervalId = setInterval(() => dispatch(fetchQuoteData("")), 15 * 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col md={4} className='text-center'>
                        <div className='d-flex align-items-center justify-content-center ticker'>
                            <span>{companyProfile?.ticker}</span> 
                            <img src={Star} className="ml-2 pb-1"/>
                        </div>
                        <div className="company-name">{companyProfile?.name}</div>
                        <div className='exchange'>{companyProfile?.exchange}</div>
                        <div className="mt-1">
                            <Button className="buy mr-2" variant="success">Buy</Button>
                            <Button className="buy mr-2" variant="danger">Sell</Button>
                        </div>
                    </Col>
                    <Col md={4} className="text-center d-flex align-items-center flex-column">
                        <div className="mb-auto">
                            <img className="company-logo" height="75px" src={companyProfile?.logo}/>
                        </div>
                    </Col>
                    <Col md={4} className="text-center">
                        {quote && <DynamicStockPrice {...quote}/>}
                    </Col>
                </Row>
                <Row className="text-center">
                    <div className={"market-state my-3 " + (marketOpen ? "text-success": "text-danger")}>
                        {marketOpen?
                        "Market is Open" :
                        "Market Closed on " + formatDate(marketTime)
                    }
                    </div>
                    </Row>
            </Container>
            <StockModal />
        </>
        
    );
}

export default StockHighlight