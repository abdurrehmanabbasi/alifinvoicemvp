import {XMarkIcon} from "@heroicons/react/24/outline"
const Modal = ({modalOpen,setModalOpen,children,showCloseButton}) => {
  return (
    <div className={`${modalOpen?'flex':'hidden'} fixed top-0 right-0 left-0 bottom-0  items-center justify-center bg-red-500 bg-opacity-5 w-full h-full z-20 `}>
      <div className="modal-content rounded-md border-2 relative opacity-100 bg-opacity-100 bg-white text-black max-w-2xl max-h-[90vh] h-full w-full">
        {children}
        {showCloseButton&&<button className="absolute top-0 right-0" onClick={()=>setModalOpen(false)}>
          <XMarkIcon className="w-10"/>
          </button>}
      </div>
    </div>
  );
};

export default Modal;
