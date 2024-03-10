import React from 'react'
import Autocomplete from './AutoComplete/AutoComplete'
import DataContainer from './DataContainer'

const SearchPage:React.FC = () => {
    return (
        <>
            <div className="App">
                <h3 className="app-title">STOCK SEARCH</h3>
            </div>
            <Autocomplete></Autocomplete>
            <DataContainer />
        </>
        )
}

export default SearchPage