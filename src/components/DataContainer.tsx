import React, { useEffect } from 'react'
import StockHighlight from './StockHighlight/StockHighlight'
import '../styles/datacontainer.css'
import StockTabs from './StockDetails/StockTabs'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {appActions} from "../store/AppSlice"
import MyAlert from './utilities/Alert'
import { checkWatchlistedAction } from '../store/watchlistSlice'


const DataContainer:React.FC = () => {
    const notification = useAppSelector(state => state.app.notification)
    const dispatch = useAppDispatch()
    const closeNotification = () => dispatch(appActions.closeNotification())

    // useEffect(() => {
    //     if(notification && notification.display)
    //         setTimeout(closeNotification, 10 * 1000)
    // }, [notification, dispatch])

    return (
        <div className='data-container mt-3 pt-3 mb-4 mx-lg-5'>
            {
                notification.display &&
                <MyAlert type={notification.type} message={notification.message} onClose={closeNotification} />
            } 
            <StockHighlight />
            <StockTabs />
        </div>
    )
}

export default DataContainer