import { Alert } from "react-bootstrap"
import './utilities.css'
import { useEffect } from "react"

interface Porps {
    type: string,
    message: string,
    onClose: Function
}

const MyAlert: React.FC<Porps> = (props: Porps) => {

    useEffect(() => {
        const timeOutId = setTimeout(props.onClose, 10 * 1000)

        return () => clearTimeout(timeOutId)
    }, [props.message])

    return (
        <Alert className="p-2 text-center" variant={props.type} onClose={() => props.onClose()} dismissible>
                {props.message}
      </Alert>
    )
}

export default MyAlert