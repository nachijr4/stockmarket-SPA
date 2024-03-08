import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Insights.css'
import RecommendationChart from './RecommendationChart';
import EPSChart from './EPSChart';

const Insights: React.FC = () => {
    return (
        <Container>
            <Row className="d-flex flex-column sentiment">
                <div className="text-center">Insider Sentiment</div>
                <table className="col-md-6 text-center m-auto my-2">
                    <tr>
                        <th>Apple Inc</th>
                        <th>MSPR</th>
                        <th>Change</th>
                    </tr>
                    <tr>
                        <td className="fw-bold">Total</td>
                        <td>-590.52</td>
                        <td>-262908</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Positive</td>
                        <td>200</td>
                        <td>872822</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">Negative</td>
                        <td>-790.52</td>
                        <td>-3450730</td>
                    </tr>
                </table>
            </Row>
            <Row className="mt-1">
                <Col md={6} >
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