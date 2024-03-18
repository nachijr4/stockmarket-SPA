import React from 'react';
import Alert from 'react-bootstrap/Alert';
import './message.css'

interface Props {
    message: string,
    type: string
}


const MessageComponent: React.FC<Props> = (props: Props) => {

    return (
        <div className="text-center">
            <Alert key={props.type} variant={props.type}>
                {props.message}
            </Alert>
        </div>
    )
}

export default MessageComponent;