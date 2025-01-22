import ReactDOM from "react-dom";
import { Button } from "./ui/button";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
      <div
        className="shadow-lg z-[1001]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body // Render modal outside of the root DOM node
  );
};

export default Modal;
