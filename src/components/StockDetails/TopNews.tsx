import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

interface CardData {
    body: string
    key: number
}

const MyCard: React.FC<CardData> = (data: CardData) => {
    return (
        <div className="col-md-6 p-2 d-inline-block ">
            <Card key={data.key} className="news-card">
                <Card.Body className='d-flex p-2'>
                    <div className="news-image col-md-3 me-1">
                        <img src="https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg" />
                    </div>
                    <div className='d-flex flex-grow-1 my-auto flex-column text-center col-md-9  px-2 title'>
                        <span>{data.body}</span>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

const TopNews: React.FC = () => {
    var cards:React.ReactNode[] = [];
    for(var i = 0; i < 10; i++) {
        cards.push(MyCard({key: i, body: "This is a sample card"}))
    }

    return (
        <Container className="d-flex">
            <Row>
                {cards}
            </Row>
        </Container>
    )
}

export default TopNews