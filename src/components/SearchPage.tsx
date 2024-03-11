import React from 'react'
import Autocomplete from './AutoComplete/AutoComplete'
import DataContainer from './DataContainer'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const SearchPage:React.FC = () => {
    const appState = useAppSelector((state) => state.app)
    const stockState = useAppSelector( state => state.stock)
    return (
        <>
            <div className="App">
                <h3 className="app-title">STOCK SEARCH</h3>
            </div>
            <Autocomplete></Autocomplete>

            { !stockState.isLoading ?
                <DataContainer />: null
            }
        </>
        )
}

export default SearchPage