import React from 'react'
import MessageComponent from './Message/MessageComponent'
import StockHighlight from './StockHighlight/StockHighlight'
import '../styles/datacontainer.css'
import StockTabs from './StockDetails/StockTabs'
import StockModal from './Modals/StockModal'
import { Container } from 'react-bootstrap'
import { useAppSelector } from '../store/hooks'


const DataContainer:React.FC = () => {
    return (
        <div className='data-container'>
            <StockHighlight />
            <StockTabs />
        </div>
    )
}

export default DataContainer