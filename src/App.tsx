import './styles/App.css';
import './styles/home.css';
import { Outlet } from "react-router-dom";
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { appActions } from './store/AppSlice';

function App() {
    const notification = useAppSelector(state => state.app.notification)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const timeOutId = setTimeout(() => dispatch(appActions.closeNotification()), 10 * 1000)

        return () => clearTimeout(timeOutId)
    }, [notification.message])
    
  return (
    <>
        <AppNavbar></AppNavbar>
        <Outlet />
        <Footer />
    </>
  );
}

export default App;
