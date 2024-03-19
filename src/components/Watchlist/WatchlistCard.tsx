import { Row, Card, Col } from "react-bootstrap"
import SVGComponent from "../utilities/SVGComponent"
import { WatchlistQuote } from "../../types/WatchlistTypes"
import { fetchStockData } from "../../store/StockSlice"
import { removeWatchlistAction } from "../../store/watchlistSlice"
import { useAppDispatch } from "../../store/hooks"
import { useNavigate } from "react-router-dom"



const WatchListCard:React.FC<WatchlistQuote> = (props: WatchlistQuote) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const removeStock = (e: any) => {
        e.stopPropagation()
        dispatch(removeWatchlistAction(props.stockTicker))
    }

    const click = () => {
        dispatch(fetchStockData(props.stockTicker))
        navigate(`/search/${props.stockTicker}`)
    }

    const colorClass = props.d < 0? "text-danger" : "text-success"

    return (
        <Row className="mb-2 mx-1 hover-pointer" onClick={() => click()}>
                <Card className="p-0">
                    <Card.Body className="py-2">
                        <Row className="pb-2">
                            <button className='remove-watchlist' onClickCapture={(e) => removeStock(e)}>
                                <SVGComponent symbol="cross" height='10px' width="10px"/>
                            </button>
                        </Row>
                        <Row className="pb-1">
                            <Col className="watchlist-companyname">{props.stockTicker}</Col>
                            <Col className={'watchlist-price ' + colorClass}>{props.c.toFixed(2)}</Col>
                        </Row>
                        <Row className="pb-2">
                            <Col>{props.companyName}</Col>
                            <Col className='d-flex'>
                                <SVGComponent height='10px' width='10px' symbol={props.d >= 0 ? "caratUp" : "caratDown"}/>
                                <span className={'watchlist-change ps-1 ' + colorClass}>{props.d.toFixed(2)} ({props.dp.toFixed(2)}%)</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
    )
}

export default WatchListCard