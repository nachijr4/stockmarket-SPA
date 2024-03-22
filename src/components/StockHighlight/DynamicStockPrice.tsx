import { Quote } from "../../types/StockTypes"
import SVGComponent from "../utilities/SVGComponent"
import React from 'react'
import { formatDate } from "../../utilities"

const DynamicStockPrice: React.FC<Quote> = (props: Quote) => {
    const colorClass = props.c > 0? "text-success": props.c < 0 ? "text-danger" : ""
    const caratClass =  props.c >= 0? "caratUp" : "caratDown"
    return (
        <div className="stock-price">
            <div className={colorClass}>
                <div className="price"><span>{props.c.toFixed(2)}</span></div>
                <div className="change fw-500 d-flex align-items-center justify-content-center text-success">
                    <SVGComponent height="14px" symbol={caratClass} />
                    <span className="ml-1">{props.d.toFixed(2)} ({props.dp.toFixed(2)}%)</span>
                </div>
            </div>
            <div className="timestamp">{formatDate(new Date(props.ct))}</div>
        </div>
    )
}

export default DynamicStockPrice