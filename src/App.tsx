import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './styles/home.css';
import AppNavbar from './components/Navbar';
import Autocomplete from './components/AutoComplete/AutoComplete'
import DataContainer from './components/DataContainer'
import SearchPage from './components/SearchPage';
import WatchlistPage from './components/WatchlistPage';
import PortfolioPage from './components/PortfolioPage';

function App() {
  return (
    <>
        <AppNavbar></AppNavbar>
        {/* <SearchPage></SearchPage> */}
        {/* <WatchlistPage /> */}
        <PortfolioPage />
    </>
  );
}

export default App;
