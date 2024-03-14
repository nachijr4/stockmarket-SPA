import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    className ?: string
}
export const SpinnerComponent: React.FC<Props> = (props: Props) => {
    return (
        <div className={"text-center m-5 " + props.className}>
            <CircularProgress color="inherit" />
        </div>
    )
}