import React from 'react'
import { Container, Row, Card, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import { LatestNews } from '../../types/StockTypes';
import SVGComponent from '../utilities/SVGComponent';

interface NewsModal {
    show: boolean,
    news: LatestNews | undefined,
    handleClose: Function
}

const TopNewsModal: React.FC<NewsModal> = (props:NewsModal) => {
    var dateString = ""
    if(props.news)
        var dateString = (new Date(props.news.datetime * 1000)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    return (
        <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="news-modal" >
            <Modal.Header className="container">
                <Row className='flex-grow-1'>
                    <Col xs={11} className="pe-0">
                        <div className="flex-grow-1 fs-4 fw-500 align-self-start">{props.news?.source}</div>
                        <div className="flex-grow-1 align-self-start" style={{fontSize: "12px"}}>{dateString}</div>
                    </Col>
                    <Col xs={1} className="align-self-center pe-0 ps-4">
                        <div className="flex-grow-1 align-self-end" style={{fontSize: "10px", color: "blue"}}>
                            <button className='modal-close' data-bs-dismiss="modal" aria-label="Close" onClick={() => props.handleClose()}>
                                <u style={{color: "blue"}}>x</u>
                            </button>
                        </div>
                    </Col>
                </Row>
            </Modal.Header>
            <Modal.Body className="px-3">
                <Container className="px-0">
                    <Row className="news-title">
                        <div>{props.news?.headline}</div>
                    </Row>
                    <Row className="news-summary">
                        <div>{props.news?.summary}</div>
                    </Row>
                    <Row className="justify-content-center pb-5">
                        <div className='stock-modal-footer'>
                            <span>For more details click <a href={props.news?.url} target="_blank">here</a></span>
                        </div>
                    </Row>
                </Container>
                <Card>
                    <Card.Body className="py-2">
                        <Row className="ps-2">
                            Share
                        </Row>
                        <Row className="p-0">
                            <a className="d-inline p-0" href={`https://twitter.com/share?text=${props.news?.headline}&url=${props.news?.url}`} style={{width: "fit-content"}} target="_blank">
                                <SVGComponent symbol='twitter' height="40px" width='40px' />
                            </a>
                                &nbsp;
                            <a className="d-inline p-0 pt-1" href={`https://www.facebook.com/sharer/sharer.php?u=${props.news?.url}`} style={{width: "fit-content"}} target="_blank">
                                <SVGComponent symbol='facebook' height="30px" width='30px' />
                            </a>
                        </Row>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
      );
}

export default TopNewsModal