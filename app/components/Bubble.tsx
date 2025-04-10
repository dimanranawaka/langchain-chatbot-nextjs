const Bubble = ({message}) => {
    const {content , role} = message;
    return(
        <div className={`${role} bubble`}></div>
    )
}
export default Bubble;