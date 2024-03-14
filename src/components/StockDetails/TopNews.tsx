import React, {useState} from 'react'
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import TopNewsModal from '../Modals/NewsModal';
import { useAppSelector } from '../../store/hooks';
import { LatestNews } from '../../types/StockTypes';




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
            <div className="col-md-6 p-2 d-inline-block " onClick={() => handleOpen(index)}>
                <Card key={data.id} className="news-card">
                    <Card.Body className='d-flex p-2'>
                        <div className="news-image col-md-3 me-1">
                            <img src={data.image} />
                        </div>
                        <div className='d-flex flex-grow-1 my-auto flex-column text-center col-md-9  px-2 title'>
                            <span>{data.headline}</span>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    return (
        <>
            <Container className="d-flex">
                <Row className="flex-grow-1">
                    {
                        latestNews?.map((news, index) => MyCard(news, index))
                    }
                </Row>
            </Container>
            {showModal && modalData && <TopNewsModal news={modalData} handleClose={handleClose}/> }
        </>
    )
}

export default TopNews