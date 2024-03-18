import React, { useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import SVGComponent from './utilities/SVGComponent'
import '../styles/watchlist.css'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchWatchlistAction, removeWatchlistAction } from '../store/watchlistSlice'
import WatchListCard from './Watchlist/WatchlistCard'
import { SpinnerComponent } from './utilities/SpinnerComponent'
import MessageComponent from './Message/MessageComponent'
import { fetchStockData } from '../store/StockSlice'
import { useNavigate } from 'react-router-dom'

const WatchlistPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const watchlist = useAppSelector(state => state.watchlist.watchlist)
    const isLoading = useAppSelector(state => state.watchlist.isLoading)



    useEffect(() => {
        dispatch(fetchWatchlistAction())
    }, [])

    return (
        <Container className='col-md-8 mx-auto'>
            <Row className="my-4 mx-0">
                <div className='p-0 watchlist-title'>My Watchlist</div>
            </Row>
            { isLoading ? <SpinnerComponent className="spinner-color" /> :
            Object.keys(watchlist).length > 0 ?
                Object.keys(watchlist).map(item => <WatchListCard key={item} {...watchlist[item]} />)
                :
                <MessageComponent type='warning' message="Currently you don't have any stock in your watchlist."/>
            }
        </Container>
    )
}

export default WatchlistPage