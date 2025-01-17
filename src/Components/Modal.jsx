
const Modal = ({ children ,setShowModal}) => {
    return (
        <>
            <button className="fixed inset-0 bg-black opacity-90  " onClick={()=>{
                setShowModal(false)
            }}>
                <div className="flex  justify-center items-center" onClick={(e)=>{
                    e.stopPropagation()
                }}>
                    {children}
                </div>
            </button>
        </>
    )
}

export default Modal