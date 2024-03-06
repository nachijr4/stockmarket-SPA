import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/home.css';
import AppNavbar from './components/Navbar';
import Autocomplete from './components/AutoComplete/AutoComplete'
import DataContainer from './components/DataContainer'

function App() {
  return (
    <>
        <AppNavbar></AppNavbar>
        <div className="App">
            <h3 className="app-title">STOCK SEARCH</h3>
        </div>
        <Autocomplete></Autocomplete>
        <DataContainer />
    </>
  );
}

export default App;
