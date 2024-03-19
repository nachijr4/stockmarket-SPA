import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import HourlyPriceChart from './HourlyPriceChart'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Link } from 'react-router-dom'
import { fetchStockData } from '../../../store/StockSlice'


const SummaryComponent:React.FC = () => {
    const dispatch = useAppDispatch()
    const quote = useAppSelector(state => state.stock.data.quote)
    const companyProfile = useAppSelector(state => state.stock.data.companyProfile)
    const companyPeers = useAppSelector(state => state.stock.data.companyPeers)

    return (
        <Container className="px-md-5">
            <Row className="mt-3">
                <Col xs={12} md={6} className="d-flex flex-column">
                    <Row>
                        <div className="col-md-6  col-12 text-center" style={{fontSize: "12px"}}>
                            <div><span className="fw-bold">High Price:&nbsp; </span> <span className="">{quote?.h.toFixed(2)}</span></div>
                            <div><span className="fw-bold">Low Price:&nbsp; </span> <span className="">{quote?.l.toFixed(2)}</span></div>
                            <div><span className="fw-bold">Open Price:&nbsp; </span> <span className="">{quote?.o.toFixed(2)}</span></div>
                            <div><span className="fw-bold">Prev. Price:&nbsp; </span> <span className="">{quote?.pc.toFixed(2)}</span></div>
                            {/* <div className="d-flex"><span className="fw-bold col text-end">High Price:&nbsp; </span> <span className="text-start col">{quote?.h.toFixed(2)}</span></div>
                            <div className="d-flex"><span className="fw-bold col text-end">Low Price:&nbsp; </span> <span className="text-start col">{quote?.l.toFixed(2)}</span></div>
                            <div className="d-flex"><span className="fw-bold col text-end">Open Price:&nbsp;  </span> <span className="text-start col">{quote?.o.toFixed(2)}</span></div>
                            <div className="d-flex"><span className="fw-bold col text-end">Prev. Close:&nbsp; </span> <span className="text-start col">{quote?.pc.toFixed(2)}</span></div> */}
                        </div>
                    </Row>

                    <Row>
                        <div style={{fontSize: "14px"}} className="text-center col-12 mt-2 mt-md-5 px-5">
                            <div className='fs-5'><u>About the company</u></div>
                            <div  className="mb-2 mb-md-0"><span className="fw-bold  text-end">IPO Start Date:&nbsp;</span> <span className="text-start ">{companyProfile?.ipo.substring(0,10)}</span></div>
                            <div className="mb-2 mb-md-0"><span className="fw-bold  text-end">Industry:&nbsp;</span> <span className="text-start ">{companyProfile?.finnhubIndustry}</span></div>
                            <div className="mb-2 mb-md-0"><span className="fw-bold  text-end">Webpage:&nbsp;</span> <span className="text-start "><a href={companyProfile?.weburl} target="_blank">{companyProfile?.weburl}</a></span></div>
                            <div className="text-center fw-bold col-12 mb-2 mb-md-0">
                                    Company Peers: 
                            </div>
                            {/* <br />  */}
                            <div className="col-12 mb-2">
                                {
                                    companyPeers?.map(peer => peer.indexOf(".") < 0 && <Link to={`/search/${peer}`} onClick={() => dispatch(fetchStockData(peer))}>{peer}, </Link>)
                                }
                            </div>

                        </div>
                    </Row>
                </Col>
                <Col md={6} xs={12}>
                    <HourlyPriceChart />
                </Col>
            </Row>
        </Container>
    )
}

export default React.memo<React.FunctionComponent>(SummaryComponent)