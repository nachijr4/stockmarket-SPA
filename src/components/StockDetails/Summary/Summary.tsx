import React from 'react'
import { Container, Col } from 'react-bootstrap'
import HourlyPriceChart from './HourlyPriceChart'
import { useAppSelector } from '../../../store/hooks'


const SummaryComponent:React.FC = () => {
    const quote = useAppSelector(state => state.stock.data.quote)
    const companyProfile = useAppSelector(state => state.stock.data.companyProfile)
    const companyPeers = useAppSelector(state => state.stock.data.companyPeers)

    return (
        <Container className='d-flex'>
            <Col md={6} className="d-flex flex-column">
                <div className="col-md-6 text-center" style={{fontSize: "12px"}}>
                    <div className="d-flex"><span className="fw-bold col text-end">High Price:&nbsp; </span> <span className="text-start col">{quote?.h.toFixed(2)}</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Low Price:&nbsp; </span> <span className="text-start col">{quote?.l.toFixed(2)}</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Open Price:&nbsp;  </span> <span className="text-start col">{quote?.o.toFixed(2)}</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Prev. Close:&nbsp; </span> <span className="text-start col">{quote?.pc.toFixed(2)}</span></div>
                </div>

                <div className="text-center mt-5 fs-6">
                    <div className='fs-5'><u>About the company</u></div>
                    <br />
                    <div className=""><span className="fw-bold  text-end">IPO Start Date:&nbsp; &nbsp;</span> <span className="text-start ">{companyProfile?.ipo.substring(0,10)}</span></div>
                    <div className=""><span className="fw-bold  text-end">Industry:&nbsp; &nbsp;</span> <span className="text-start ">{companyProfile?.finnhubIndustry}</span></div>
                    <div className=""><span className="fw-bold  text-end">Webpage:&nbsp; &nbsp;</span> <span className="text-start "><a href={companyProfile?.weburl} target="_blank">{companyProfile?.weburl}</a></span></div>
                    <div className="text-center fw-bold col-12">
                            Company Peers: 
                    </div>
                    {/* <br />  */}
                    <div className="col-12">
                        {
                            companyPeers?.map(peer => <a href="">{peer},</a>)
                        }
                    </div>

                </div>
            </Col>
            <Col md={6}>
                <HourlyPriceChart />
            </Col>
        </Container>
    )
}

export default React.memo<React.FunctionComponent>(SummaryComponent)