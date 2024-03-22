import React, { useState } from 'react';
import axios from 'axios';
import "./autocomplete.css"
import search from "../../images/search.svg"
import reset from "../../images/x.svg"
import Suggestions from "./Suggestions"
import { fetchStockData, stockActions} from '../../store/StockSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate  } from "react-router-dom";
import SVGComponent from '../utilities/SVGComponent';
import { Autocomplete, TextField, ThemeProvider, createTheme, makeStyles } from '@mui/material';

interface Suggestions {
    "description": string,
    "displaySymbol": string,
    "symbol": string,
    "type": string
}

var timeoutId: NodeJS.Timeout;

const MyAutocomplete: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const stockSymbol = useAppSelector(state => state.stock.stockSymbol)
    const [inputValue, setInputValue] = useState<Suggestions>();
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

                    setSuggestions(response.data.data.filter((item: Suggestions) => item.symbol.indexOf(".") < 0 && item.type === "Common Stock"));
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


    const onInputChange = async (e: any, value: string, reason: string) => {
        // dispatch(stockActions.setStockTicker(e.target.value))

        setInputValue({
            description: "",
            symbol: value ,
            type: "",
            displaySymbol: ""
        })

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            loadSuggestions(e.target.value);
        }, 500); // 300 ms delay
    }

    const onSuggestionClick = (stockTicker: string) => {
        dispatch(stockActions.setStockTicker(stockTicker))
        setSuggestionsFocused(false)
        setInputFocused(false)
        if(stockTicker && stockTicker != "") {
            dispatch(fetchStockData(stockTicker))
        } else {
            dispatch(stockActions.setErrEnterTicker())
        }
    }

    const onChange =(event: React.SyntheticEvent, value: any, reason: any, details?: any) => {
        if(reason === "selectOption") {
            dispatch(stockActions.setStockTicker(value?.symbol))
            setSuggestionsFocused(false)
            if(value?.symbol && value?.symbol != "") {
                dispatch(fetchStockData(value.symbol))
            } else {
                dispatch(stockActions.setErrEnterTicker())
            }
        }
    }

    const onResetClick = () => {
        dispatch(stockActions.setStockTicker(""))
        setSuggestions([])
        dispatch(stockActions.resetStockState())    
        navigate(`/search/home`)
    }

    const handleKeyPress = (e: any) => {
        if(e.key === 'Enter')
            onSuggestionClick(stockSymbol)
    }

    const  theme = createTheme({
        components: {
          MuiAutocomplete: {
            styleOverrides: {
              inputRoot: {
                padding: '0px !important'
              },
              input: {
                width: '100%',
                border: "none"
              }
            },
          },
        },
      });

    return (
        <div className="autocomplete d-flex  col-8 col-md-3 ">
                {/* <input
                    type="text"
                    value={stockSymbol}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter stock ticker symbol"
                    className="search-input"
                /> */}
                <ThemeProvider theme={theme}>
                    <Autocomplete 
                        value={inputValue}
                        isOptionEqualToValue ={function(option: Suggestions, value: Suggestions): boolean {
                            return option.symbol === value.symbol
                        }}
                        onInputChange={onInputChange}
                        aria-placeholder='Enter stock ticker symbol'
                        fullWidth={true}
                        clearText=""
                        clearIcon={null}
                        popupIcon={null}
                        loading 
                        sx={{"& fieldset": { border: 'none' }, paddingRight: 0}}
                        loadingText="Loading......"
                        clearOnBlur={false}
                        noOptionsText=""
                        openOnFocus={false}
                        options={suggestions}
                        onChange={onChange}
                        getOptionLabel={function(option: Suggestions){ return option.symbol}}
                        renderInput={(params) => 
                            <div ref={params.InputProps.ref}>
                            <input type="text" {...params.inputProps} />
                          </div>}
                        renderOption={(props, option: Suggestions) => <li {...props}>{option.displaySymbol} | {option.description}</li>}

                    />
                </ThemeProvider>
                {/* {
                    (suggestionsFocused || inputFocused) && ((showSuggestions && suggestions.length > 0 )
                    || loading)?
                    <Suggestions 
                        suggestions={suggestions} 
                        loading={loading}
                        onSuggestionClick={onSuggestionClick} 
                        onSuggestionsFocus={onSuggestionsFocus}
                        onSuggestionsBlur={onSuggestionsBlur} /> 
                        : null
                } */}
                <div className="search-btn hover-pointer pt-1 me-2" onClick={() => onSuggestionClick(stockSymbol)}><SVGComponent symbol="search" height="16px" width="14px"/></div>
                <div className="reset-btn hover-pointer me-2" onClick={() => onResetClick()}><SVGComponent symbol="cross" /></div>
        </div>
    );
};

export default MyAutocomplete;
