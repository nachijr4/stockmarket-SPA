import React, { useState } from 'react';
import axios from 'axios';
import "./autocomplete.css"
import search from "../../images/search.svg"
import reset from "../../images/x.svg"
import Suggestions from "./Suggestions"
import { fetchStockData, stockActions} from '../../store/StockSlice'
import { useAppDispatch } from '../../store/hooks';

interface Suggestions {
    "description": string,
    "displaySymbol": string,
    "symbol": string,
    "type": string
}

var timeoutId: NodeJS.Timeout;

const Autocomplete: React.FC = () => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [suggestionsFocused, setSuggestionsFocused] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    
    const loadSuggestions = async (searchValue: string) => {
        if (searchValue) {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/stocks/search?symbol=${searchValue}`);
                if(response.status === 200) {
                    setSuggestions(response.data.data);
                    setShowSuggestions(true)
                } else {
                    setShowSuggestions(false)
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Failed to fetch suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setShowSuggestions(false)
            setSuggestions([]);
            setSuggestionsFocused(false)
        }
        setLoading(false);
    };

    const onInputFocus = () => {
        setInputFocused(true);
    }

    const onInputBlur = () => {
        setInputFocused(false);
    }

    const onSuggestionsBlur = () => setSuggestionsFocused(false)
    const onSuggestionsFocus = () => setSuggestionsFocused(true)


    const onInputChange = async (e: any) => {
        setInputValue(e.target.value)

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            loadSuggestions(e.target.value);
        }, 500); // 300 ms delay
    }

    const onSuggestionClick = (stockTicker: string) => {
        setInputValue(stockTicker)
        setSuggestionsFocused(false)
        dispatch(fetchStockData(stockTicker))
    }

    const onResetClick = () => {
        setInputValue("")
        setSuggestions([])
        dispatch(stockActions.resetStockState())
    }

    const handleKeyPress = (e: any) => {
        if(e.key === 'Enter')
            onSuggestionClick(inputValue)
    }

    return (
        <div className="col-lg-3 autocomplete">
                <input
                    type="text"
                    value={inputValue}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter stock ticker symbol"
                    className="search-input"
                />
                {
                    (suggestionsFocused || inputFocused) && ((showSuggestions && suggestions.length > 0 )
                    || loading)?
                    <Suggestions 
                        suggestions={suggestions} 
                        loading={loading}
                        onSuggestionClick={onSuggestionClick} 
                        onSuggestionsFocus={onSuggestionsFocus}
                        onSuggestionsBlur={onSuggestionsBlur} /> 
                        : null
                }
            <div className="d-inline-block search-btn" onClick={() => onSuggestionClick(inputValue)}><img src={search} ></img></div>
            <div className="d-inline-block reset-btn" onClick={() => onResetClick()}><img src={reset}></img></div>
        </div>
    );
};

export default Autocomplete;
