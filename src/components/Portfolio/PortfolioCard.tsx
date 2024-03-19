import { Row, Card, Col } from "react-bootstrap"
import SVGComponent from "../utilities/SVGComponent"
import { PortfolioQuoteType } from "../../types/PortfolioTypes"
import StockModal from "../Modals/StockModal"
import { useAppDispatch } from "../../store/hooks"
import { useNavigate } from "react-router-dom"
import { fetchStockData } from "../../store/StockSlice"

interface Props{
    portfolio: PortfolioQuoteType,
    portfolioAction: Function
}

const PortfolioCard:React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const btnStyle = {
        height: "28px",
        fontSize: '12px',
        paddingLeft: "12px",
        paddingRight: "12px"
    }
    const avgCost = props.portfolio.totalCost / props.portfolio.quantity
    const marketValue = props.portfolio.c * props.portfolio.quantity
    const change = props.portfolio.c - avgCost
    
    const colorClass = change < 0? "text-danger": change>0?"text-success" : ""

    const click = () => {
        dispatch(fetchStockData(props.portfolio.stockTicker))
        navigate(`/search/${props.portfolio.stockTicker}`)
    }

    return (
        <>
        <Row className="mb-2 mx-0">
                <Card className="p-0">
                    <Card.Header className="hover-pointer" onClick={() => {click()}}>
                        <span className="fw-bold fw-500 fs-5">{props.portfolio.stockTicker}</span> &nbsp;
                        <span className="text-secondary fw-500">{props.portfolio.companyName}</span>
                    </Card.Header>
                    <Card.Body className="py-2">
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <Col className="fw-500">Quantity:</Col>
                                    <Col className='ff-arimo fw-500'>{props.portfolio?.quantity.toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col className="fw-500">Avg. Cost / Share:</Col>
                                    <Col className='ff-arimo fw-500'>{(props.portfolio?.totalCost/props.portfolio?.quantity).toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col className="fw-500">Total Cost:</Col>
                                    <Col className="ff-arimo fw-500">{props.portfolio?.totalCost.toFixed(2)}</Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                            <Row>
                                    <Col className="fw-500">Change:</Col>
                                    <Col className={'d-flex justify-content-start ' + colorClass}>
                                        {change !== 0 && <SVGComponent symbol={colorClass === "text-danger" ? "caratDown" : "caratUp"} />}
                                        <span className="ff-arimo fw-500">{change.toFixed(2)}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="fw-500">Current Price:</Col>
                                    <Col className={"ff-arimo fw-500 " + colorClass}>{props.portfolio?.c.toFixed(2)}</Col>
                                </Row>
                                <Row>
                                    <Col className="fw-500">Market Value:</Col>
                                    <Col className={"ff-arimo fw-500 " + colorClass}>{marketValue?.toFixed(2)}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-start py-1 px-2">
                        <button onClick={() => props.portfolioAction(props.portfolio, true)} type="button" className="btn btn-primary btn-sm py-0" style={btnStyle}>Buy</button>
                        <button onClick={() => props.portfolioAction(props.portfolio, false)} type="button" className="btn btn-danger btn-sm ml-2 py-0" style={btnStyle}>Sell</button>
                    </Card.Footer>
                </Card>
            </Row>
        </>
    )
}

export default PortfolioCard