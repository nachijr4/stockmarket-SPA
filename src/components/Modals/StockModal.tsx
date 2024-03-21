import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import { Portfolio } from '../../types/PortfolioTypes';

export interface Props {
    show: boolean,
    buy: boolean,
    wallet: number,
    portfolio?: Portfolio,
    stockTicker: string | undefined,
    currentPrice: number | undefined,
    closeModal: Function,
    action: Function
}

const StockModal: React.FC<Props> = (props: Props) => {
    const [quantity, setQuantity] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>()
    const handleClose = () => {props.closeModal()}
    
    const quantityChange = (value: string) => {
        setQuantity(parseInt(value))
        if(value === "")
            return setTotal(0)
        if(props.currentPrice)
            setTotal(parseInt(value) * props.currentPrice)
    }

    useEffect(() => {
        if(quantity < 0) {
            setErrorMsg("Invalid Quantity")
            setShowError(true)
            return
        } 

        if(props.buy) {
            if(total > props.wallet) {
                setErrorMsg("Not enough money in wallet!")
                setShowError(true)
                return
            }
        }
        else if(!props.buy) {
            if(props.portfolio && quantity > props.portfolio.quantity) {
                setErrorMsg("You cannot sell the stock that you don't have!")
                setShowError(true)
                return
            }
        }

        setErrorMsg("")
        setShowError(false)
    }, [quantity, total])

    return (
        <Modal show={props.show} dialogClassName="stock-modal-width" onHide={handleClose}>
            <Modal.Header className="flex-column">
            <div className="flex-grow-1 align-self-start" style={{height:"15px"}}>{props.stockTicker}</div>
            <div className="flex-grow-1 align-self-end" style={{fontSize: "10px", color: "blue"}}>
                <button className='modal-close' onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs="auto" className="p-0">Current Price: &nbsp;</Col>
                        <Col xs="auto" className="p-0">{props.currentPrice?.toFixed(2)}</Col>
                    </Row>
                    <Row>
                        <Col xs="auto" className="p-0">Money in Wallet: &nbsp;</Col>
                        <Col xs="auto" className="p-0">${props?.wallet?.toFixed(2)}</Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs="auto" className="p-0 align-self-center">Quantity: &nbsp;</Col>
                        <Col xs="auto" className="pr-3 flex-grow-1"><input value={quantity} onChange={(e) => quantityChange(e.target.value)} className="form-control" min="0" style={{height: "30px"}} autoFocus={true} type="number"/></Col>
                    </Row>
                    {
                        showError && 
                        <Row className=" pt-2">
                            <span className='text-danger ps-0'>{errorMsg}</span>
                        </Row>
                    }
                </Container>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <div><span>Total:&nbsp;</span><span>{total.toFixed(2)}</span></div>
            <Button variant="success" onClick={() => !showError ? props.action(props.stockTicker, quantity, props.currentPrice) : null} disabled={showError || Number.isNaN(quantity) ||quantity === 0}>
                {props.buy ? "Buy": "Sell"}
            </Button>
            </Modal.Footer>
        </Modal>
      );
}

export default StockModal