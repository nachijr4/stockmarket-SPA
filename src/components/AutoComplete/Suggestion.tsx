import React from "react"

interface SuggestionType {
    "description": string,
    "displaySymbol": string,
    "symbol": string,
    "type": string
}

interface Props {
    suggestion: SuggestionType,
    onSuggestionClick: Function
}

const Suggestion: React.FC<Props> = (props) => {
    return (
        <li className="suggestion hover-pointer d-flex align-items-center" onMouseDownCapture={() => props.onSuggestionClick(props.suggestion.symbol)} onClickCapture={() => props.onSuggestionClick(props.suggestion.symbol)} key={props.suggestion.symbol}>{props.suggestion.displaySymbol} | {props.suggestion.description}</li>
    )
}

export default Suggestion