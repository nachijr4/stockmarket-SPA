import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Insights.css'
import RecommendationChart from './RecommendationChart';
import EPSChart from './EPSChart';
import { useAppSelector } from '../../../store/hooks';
import { CompanySentiment } from '../../../types/StockTypes';

const Insights: React.FC = () => {

    const sentiments = useAppSelector(state => state.stock.data.companySentiments)
    const companyName = useAppSelector(state => state.stock.data.companyProfile?.name)
    var totalMspr = 0, totalNegative = 0, totalPossitive = 0, totalChange=0, totalPChange = 0, totalNChange = 0
    if(sentiments)
        sentiments.map((data: CompanySentiment) => {
            totalMspr += data.mspr
            totalChange += data.change

            if(data.mspr > 0)
                totalPossitive += data.mspr
            else
                totalNegative += data.mspr

            if(data.change > 0)
                totalPChange += data.change
            else
                totalNChange += data.change
        })
    return (
        <Container>
            <Row className="d-flex flex-column sentiment">
                <div className="text-center">Insider Sentiment</div>
                <table className="col-md-6 text-center m-auto my-2">
                    <tr>
                        <th>{companyName}</th>
                        <th>MSPR</th>
                        <th>Change</th>
                    </tr>
                    <tr>
                        <td className="fw-bold">Total</td>
                        <td>{totalMspr.toFixed(2)}</td>
                        <td>{totalChange.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Positive</td>
                        <td>{totalPossitive.toFixed(2)}</td>
                        <td>{totalPChange.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Negative</td>
                        <td>{totalNegative.toFixed(2)}</td>
                        <td>{totalNChange.toFixed(2)}</td>
                    </tr>
                </table>
            </Row>
            <Row className="mt-1">
                <Col md={6}>
                    <RecommendationChart />
                </Col>
                <Col md={6}>
                    <EPSChart />
                </Col>
            </Row>
        </Container>
    )
}

export default Insights