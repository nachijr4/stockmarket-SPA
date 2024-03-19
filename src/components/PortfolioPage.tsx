import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import SVGComponent from './utilities/SVGComponent'
import '../styles/watchlist.css'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import PortfolioCard from './Portfolio/PortfolioCard'
import { fetchPortfolioAction, purchaseStockAction, sellStockAction } from '../store/PortfolioSlice'
import { getWalletAmountAction } from '../store/AppSlice'
import { SpinnerComponent } from './utilities/SpinnerComponent'
import MessageComponent from './Message/MessageComponent'
import StockModal, {Props as StockModalProps}  from './Modals/StockModal'
import { Portfolio, PortfolioQuoteType } from '../types/PortfolioTypes'

const PortfolioPage: React.FC = () => {
    const walletStyle = {
        fontWeight: 500,
        fontSize: "18px",
        letterSpacing: "0.5px",
        color: "#4b4a4a"
        }
    
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<any>({})

    useEffect(() => {
        dispatch(fetchPortfolioAction())
        dispatch(getWalletAmountAction())
    }, [])

    const portfolio = useAppSelector(state => state.portfolio.portfolio)
    const isLoading = useAppSelector(state => state.portfolio.isLoading)
    const wallet = useAppSelector(state => state.app.wallet)

    const handleBuyStock = (stockTicker: string, quantity: number, buyingPrice: number) => {
        if(portfolio)
        dispatch(purchaseStockAction({stockTicker, quantity, buyingPrice, companyName: portfolio[stockTicker].companyName, getQuote: true}))
        handleModalClose()
    }

    const handleSellStock = (stockTicker: string, quantity: number, sellingPrice: number) => {
        dispatch(sellStockAction({stockTicker, quantity, sellingPrice, getQuote: true}))
        handleModalClose()
    }

    const handleModalOpen = (data: PortfolioQuoteType, buy: boolean) => {
        const portfolio: Portfolio = {...data}
        const modalProp: any = {...data}
        modalProp.wallet = wallet
        modalProp.currentPrice = data.c
        modalProp.buy = buy
        modalProp.portfolio = portfolio
        setModalData(modalProp)
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
        setModalData({})
    }

    return (
        <Container className='col-md-8 mx-auto'>
            <Row className="my-4 mb-2 mx-0">
                <div className='p-0 watchlist-title mb-2'>My Portfolio</div>
                <div className='p-0' style={walletStyle}>Money in Wallet: ${wallet ? wallet.toFixed(2) : ""}</div>
            </Row>
            { isLoading ? <SpinnerComponent className="spinner-color" /> 
            :
            Object.keys(portfolio).length > 0?
                Object.keys(portfolio).map(key =>  portfolio[key].quantity > 0 && <PortfolioCard key={key} portfolio={portfolio[key]} portfolioAction={handleModalOpen}/>) :
                <MessageComponent type='warning' message="Currently you don't have any stock."/>
            }
            <StockModal {...modalData} show={showModal} action={modalData.buy? handleBuyStock:handleSellStock} closeModal={handleModalClose} />
        </Container>
    )
}

export default PortfolioPage