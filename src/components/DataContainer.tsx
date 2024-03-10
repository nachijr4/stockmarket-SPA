import React from 'react'
import MessageComponent from './Message/MessageComponent'
import StockHighlight from './StockHighlight/StockHighlight'
import '../styles/datacontainer.css'
import StockTabs from './StockDetails/StockTabs'
import StockModal from './Modals/StockModal'


const DataContainer:React.FC = () => {
    return (
        <div className='data-container'>
            <StockHighlight />
            
            <StockTabs />
            {/* <MessageComponent message="No data found. Please enter a valid ticker" type="danger" /> */}
        </div>
    )
}

export default DataContainer