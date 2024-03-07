import React from 'react'
import { Container, Col } from 'react-bootstrap'
import HourlyPriceChart from './HourlyPriceChart'


const SummaryComponent:React.FC = () => {
    return (
        <Container className='d-flex'>
            <Col md={6} className="d-flex flex-column">
                <div className="col-md-6 text-center" style={{fontSize: "12px"}}>
                    <div className="d-flex"><span className="fw-bold col text-end">High Price:&nbsp; </span> <span className="text-start col">184.29</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Low Price:&nbsp; </span> <span className="text-start col">182.48</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Open Price:&nbsp;  </span> <span className="text-start col">181.94</span></div>
                    <div className="d-flex"><span className="fw-bold col text-end">Prev. Close:&nbsp; </span> <span className="text-start col">182.32</span></div>
                </div>

                <div className="text-center mt-5 fs-6">
                    <div className='fs-5'><u>About the company</u></div>
                    <br />
                    <div className=""><span className="fw-bold  text-end">IPO Start Date:&nbsp; &nbsp;</span> <span className="text-start ">1980-12-12</span></div>
                    <div className=""><span className="fw-bold  text-end">Industry:&nbsp; &nbsp;</span> <span className="text-start ">Technology</span></div>
                    <div className=""><span className="fw-bold  text-end">Webpage:&nbsp; &nbsp;</span> <span className="text-start "><a href="https://www.apple.com">https://www.apple.com</a></span></div>
                    <div className="text-center fw-bold col-12">
                            Company Peers: 
                    </div>
                    {/* <br />  */}
                    <div className="col-12">
                        <a href="">AAPL</a>,<a href="">DELL</a>,<a href="">SMCI</a>,<a href="">HPO</a>,<a href="">HPE</a>,<a href="">WDC</a>,<a href="">NTAP</a>,<a href="">PSTG</a>,<a href="">XRX</a>
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