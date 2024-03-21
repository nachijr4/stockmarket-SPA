import React, {useEffect, useState} from 'react'
import { Col, Container, Row, Button, Image } from 'react-bootstrap';
import Star from '../../images/star.svg'
import './stockhighlight.css'
import SVGComponent from '../utilities/SVGComponent';
import StockModal from '../Modals/StockModal'
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import DynamicStockPrice from './DynamicStockPrice';
import { formatDate } from '../../utilities';
import { fetchQuoteData } from '../../store/StockSlice';
import { addWatchlistAction, checkWatchlistedAction, removeWatchlistAction } from '../../store/watchlistSlice';
import { isStockPurchasedAction, purchaseStockAction, sellStockAction } from '../../store/PortfolioSlice';
import { getWalletAmountAction } from '../../store/AppSlice';


const StockHighlight: React.FC = () => {
    const dispatch = useAppDispatch()
    const companyProfile = useAppSelector(state => state.stock.data.companyProfile)
    const quote = useAppSelector(state => state.stock.data.quote)
    const isWatchlisted = useAppSelector(state => state.stock.isWatchlisted)
    const portfolio = useAppSelector(state => state.stock.portfolio)
    const wallet = useAppSelector(state => state.app.wallet)

    const [showModal, setShowModal] = useState<boolean>(false)
    const [buyModal, setBuyModal] = useState<boolean>(true)
    const closeModal = () => setShowModal(false)

    const openBuyModal = () => {
        setBuyModal(true)
        setShowModal(true)
    }

    const openSellModal = () => {
        setBuyModal(false)
        setShowModal(true)
    }

    const handleBuyStock = (stockTicker: string, quantity: number, buyingPrice: number) => {
        if(companyProfile)
        dispatch(purchaseStockAction({stockTicker, quantity, buyingPrice, companyName: companyProfile.name}))
        closeModal()
    }

    const handleSellStock = (stockTicker: string, quantity: number, sellingPrice: number) => {
        dispatch(sellStockAction({stockTicker, quantity, sellingPrice}))
        closeModal()
    }

    const modalProps = {
        buy: buyModal,
        wallet: wallet,
        portfolio: portfolio,
        stockTicker: companyProfile?.ticker,
        currentPrice: quote?.c,
        closeModal: closeModal,
        action: buyModal? handleBuyStock : handleSellStock
    }

    const toggleWatchlist = () => {
        if(companyProfile) {
            if(!isWatchlisted)
                dispatch(addWatchlistAction({symbol: companyProfile?.ticker, companyName:companyProfile?.name}))
            else
                dispatch(removeWatchlistAction(companyProfile?.ticker))
        }
    }
    useEffect(() => {
        if(companyProfile?.ticker) {
            dispatch(checkWatchlistedAction(companyProfile.ticker))
            dispatch(isStockPurchasedAction(companyProfile.ticker))
            dispatch(getWalletAmountAction())
        }

        const intervalId = setInterval(() => dispatch(fetchQuoteData("")), 15 * 1000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <>
            <Container className="px-lg-5">
                <Row>
                    <Col xs={4} md={4} className='text-center ps-1'>
                        <div className='d-flex align-items-center justify-content-center ticker'>
                            <span>{companyProfile?.ticker}</span> 
                            <div className="d-flex ml-2 pb-1" onClick={() => toggleWatchlist()}>
                                <SVGComponent  symbol={isWatchlisted? "starFill":"star"}/>
                            </div>
                        </div>
                        <div className="company-name">{companyProfile?.name}</div>
                        <div className='exchange'>{companyProfile?.exchange}</div>
                        <div className="mt-1">
                            <Button onClick={() => openBuyModal()}className="buy mr-2" variant="success">Buy</Button>
                            {
                                portfolio && Object.keys(portfolio).length > 0 && portfolio.quantity > 0 &&
                                <Button onClick={() => openSellModal()} className="buy mr-2" variant="danger">Sell</Button>
                            }
                        </div>
                    </Col>
                    <Col xs={4}className="text-center pe-0 d-flex align-items-center flex-column">
                        <div className="mb-auto">
                            <img className="company-logo img-fluid" height="75px" src={companyProfile?.logo}/>
                        </div>
                    </Col>
                    <Col xs={4} className="text-center pe-1">
                        {quote  && <DynamicStockPrice {...quote}/>}
                    </Col>
                </Row>
                <Row className="text-center">
                    <div className={"market-state my-3 " + (!quote?.marketClosed ? "text-success": "text-danger")}>
                        {!quote?.marketClosed ?
                        "Market is Open" :
                        "Market Closed on " + formatDate(new Date(quote.t * 1000))
                    }
                    </div>
                    </Row>
            </Container>
            <StockModal {...modalProps} show={showModal}/>
        </>
        
    );
}

export default StockHighlight