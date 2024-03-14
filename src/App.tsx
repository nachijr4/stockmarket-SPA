import './styles/App.css';
import './styles/home.css';
import AppNavbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import WatchlistPage from './components/WatchlistPage';
import PortfolioPage from './components/PortfolioPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
        <AppNavbar></AppNavbar>
        <SearchPage></SearchPage>
        {/* <Footer /> */}
        {/* <WatchlistPage /> */}
        {/* <PortfolioPage /> */}
    </>
  );
}

export default App;
