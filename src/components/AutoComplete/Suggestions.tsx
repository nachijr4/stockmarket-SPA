import React, {FocusEventHandler} from 'react';
import Suggestion from "./Suggestion"
import CircularProgress from '@mui/material/CircularProgress';
import "./autocomplete.css"

interface SuggestionsType {
    "description": string,
    "displaySymbol": string,
    "symbol": string,
    "type": string
}

interface Props {
    suggestions: SuggestionsType[],
    loading: boolean
    onSuggestionsFocus: Function,
    onSuggestionsBlur: Function,
    onSuggestionClick: Function
}


const Suggestions: React.FC<Props> = (props) => {
    return (
        <ul className="suggestions" onMouseOver={() => props.onSuggestionsFocus()}
                onMouseLeave={() => props.onSuggestionsBlur()}
                onBlur={() => props.onSuggestionsBlur()}>
                    {
                    props.loading ?
                        <li className="suggestion d-flex align-items-center">
                            <CircularProgress sx={{"color": "#5d5ba4", "marginLeft": "5px", "width": "20px !important", "height": "20px !important"}} color="inherit" />
                        </li>
                    : props.suggestions.length > 0 ?
                    props.suggestions.map((suggestion) => (
                        <Suggestion key={suggestion.symbol} suggestion={suggestion} onSuggestionClick={props.onSuggestionClick} />
                    )) :
                    null
                }
        </ul>
    )
}

export default Suggestions;
