import { Alert } from "react-bootstrap"
import './utilities.css'

interface Porps {
    type: string,
    message: string,
    onClose: Function
}

const MyAlert: React.FC<Porps> = (props: Porps) => {
    return (
        <Alert className="p-2 text-center" variant={props.type} onClose={() => props.onClose()} dismissible>
                {props.message}
      </Alert>
    )
}

export default MyAlert