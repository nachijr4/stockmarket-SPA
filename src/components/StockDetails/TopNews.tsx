import React, {useState} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import TopNewsModal from '../Modals/NewsModal';
import { useAppSelector } from '../../store/hooks';
import { LatestNews } from '../../types/StockTypes';
import MessageComponent from '../Message/MessageComponent';




const TopNews: React.FC = () => {
    const latestNews = useAppSelector(state => state.stock.data.latestNews)
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState<LatestNews>()
    const handleOpen = (index: number) => {
        if(latestNews)
            setModalData(latestNews[index])
        setShowModal(true)
    }
    const handleClose = () =>setShowModal(false)

    const MyCard: React.FC<LatestNews> = (data: LatestNews, index: number) => {
        return (
            <Container key={data.id} className="col-md-6 p-2 m-0" >
                <Card key={data.id} className="m-0 hover-pointer h-100" onClick={() => handleOpen(index)}>
                    <Card.Body className="py-2 px-1">
                        <Container className="m-0 p-0 h-100 d-flex">
                            <Row className="m-auto">
                                <Col md={3} className="news-image">
                                        <img className="img-fluid" src={data.image} />
                                </Col>
                                <Col md={9} className="d-flex">
                                <div className='flex-grow-1 my-auto flex-column text-center col-md-9  px-2 title'>
                                    <span>{data.headline}</span>
                                </div>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return (
        <>
            <Container className="d-flex">
                <Row className="flex-grow-1">
                    {
                        latestNews?.map((news, index) => MyCard(news, index))
                    }
                    {latestNews && latestNews.length === 0 && 
                    <Container className="mx-auto mt-5 col-md-8">
                        <MessageComponent message="No news available." type="warning" />
                    </Container>
                 }
                </Row>
            </Container>
            { <TopNewsModal show={showModal} news={modalData} handleClose={handleClose}/> }
        </>
    )
}

export default TopNews