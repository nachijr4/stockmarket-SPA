import React from 'react'
import Autocomplete from './AutoComplete/AutoComplete'
import DataContainer from './DataContainer'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Container } from 'react-bootstrap'
import { SpinnerComponent } from './utilities/SpinnerComponent'
import MessageComponent from './Message/MessageComponent'

const SearchPage:React.FC = () => {
    const appState = useAppSelector((state) => state.app)
    const stockState = useAppSelector( state => state.stock)
    return (
        <div className="col-md-12">
            <div className="App">
                <h3 className="app-title">STOCK SEARCH</h3>
            </div>
            <Autocomplete></Autocomplete>
            { stockState.isLoading? 
            <SpinnerComponent className="spinner-color"/>
             : stockState.displayStock? <DataContainer /> :
             stockState.displayNoStock &&
             <Container className="mx-auto mt-5 col-md-8">
                <MessageComponent message="No data found. Please enter a valid ticker" type="danger" />
             </Container>
            }
            
        </div>

        )
}

export default SearchPage