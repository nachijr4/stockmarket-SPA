import React from 'react'

interface Props {
    className?: string | undefined,
    symbol: string,
    height ?: string,
    width ?: string
}
const green = {
    color: "green"
}

const red = {
    color: "red"
}

const SVGComponent: React.FC<Props> = (props: Props) => {

    const getComponent: Function = (component: string) => {
        switch(component) {
            case "caratUp":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" style={green} className={props.className} viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                )
            
            case "caratDown":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" style={red} className={props.className} viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                )
            
                case "cross":
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" className={props.className} viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    )
                
                case "search":
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={props.width} height={props.height} className={props.className}>
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                    )
                
                case "star":
                    return (
                        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" className={props.className} viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                        </svg>
                    )
                
                    case "starFill":
                        return (
                            <svg color='gold' xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="currentColor" className={props.className} viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        )
        }
    }


    return (
        <>
        <div className="d-flex flex-column justify-content-center" style={{width: "fit-content"}}>
            {
                getComponent(props.symbol)                
            }
        </div>
        </>
    )

}

SVGComponent.defaultProps = {
    height: "16px",
    width: "16px"
};

export default SVGComponent