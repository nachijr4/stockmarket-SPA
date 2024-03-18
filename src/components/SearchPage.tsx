import React, { useEffect } from 'react'
import Autocomplete from './AutoComplete/AutoComplete'
import DataContainer from './DataContainer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Container } from 'react-bootstrap'
import { SpinnerComponent } from './utilities/SpinnerComponent'
import MessageComponent from './Message/MessageComponent'
import { useNavigate } from 'react-router-dom'

const SearchPage:React.FC = () => {
    const navigate = useNavigate()
    const appState = useAppSelector((state) => state.app)
    const stockState = useAppSelector( state => state.stock)

    useEffect(() => {
        if(stockState.data.companyProfile && stockState.data.companyProfile.ticker !== "")
            navigate(`/search/${stockState.data.companyProfile.ticker}`)
        else
        navigate(`/search/home`)
    }, [stockState.data.companyProfile])

    return (
        <div className="col-md-12 container">
            <div className="App">
                <div className="app-title my-3">STOCK SEARCH</div>
            </div>
            <Autocomplete></Autocomplete>
            { stockState.isLoading? 
            <SpinnerComponent className="spinner-color"/>
             : stockState.displayStock? <DataContainer /> :
             stockState.displayNoStock &&
             <Container className="mx-auto mt-5 col-md-8">
                <MessageComponent message={stockState.noStockMsg} type="danger" />
             </Container>
            }
            
        </div>

        )
}

export default SearchPage