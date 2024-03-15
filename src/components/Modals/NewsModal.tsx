import React from 'react'
import { Container, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import { LatestNews } from '../../types/StockTypes';

interface NewsModal {
    news: LatestNews,
    handleClose: Function
}

const TopNewsModal: React.FC<NewsModal> = (props:NewsModal) => {
    const dateString = (new Date(props.news.datetime * 1000)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

    return (
        <Modal show={true} dialogClassName="modal-40w">
            <Modal.Header className="flex-column">
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>{props.news.source}</div>
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>{dateString}</div>
            <div className="flex-grow-1 align-self-end" style={{fontSize: "10px", color: "blue"}}>
                <button className='modal-close' data-bs-dismiss="modal" aria-label="Close" onClick={() => props.handleClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <div>{props.news.headline}</div>
                    </Row>
                    <Row>
                        <div>{props.news.summary}</div>
                    </Row>
                    <Row className="justify-content-center">
                        <div>
                            <span>For more details click <a href={props.news.url} target="_blank">here</a></span>
                        </div>
                    </Row>
                </Container>
                <Card>
                    <Card.Body>
                        Share
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
      );
}

export default TopNewsModal