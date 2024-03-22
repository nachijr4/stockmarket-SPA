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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={props.width} height={props.height} className={props.className} fill="currentColor">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </svg>
                        // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        //     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        // </svg>
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
                    
                        case "twitter":
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" viewBox="0 0 512 512" id="twitter"><g clip-path="url(#clip0_84_15698)">
                                    <rect width="512" height="512" fill="#fff" rx="60"></rect>
                                    <path fill="#000" d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"></path></g><defs><clipPath id="clip0_84_15698"><rect width="512" height="512" fill="#fff"></rect></clipPath></defs>
                                </svg>
                            )
                            break
                        
                            case "facebook":
                                return (
                                    <svg fill="#1340c9" width={props.width} height={props.height} version="1.1" id="Capa_1"  viewBox="0 0 60.73 60.73" stroke="#1340c9" stroke-width="0.00060734" transform="matrix(1, 0, 0, 1, 0, 0)">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                        <g id="SVGRepo_iconCarrier"> <g> <path d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914 v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462 v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z"/> </g> </g>
                                    </svg>
                                )
        }
    }


    return (
        <>
        <div className="d-flex flex-column justify-content-center p-0" style={{width: "fit-content"}}>
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