import ReactDOM from "react-dom";
import { Loading } from "./Loading";

const Modal = ({
  error,
  isLoading,
  children,
}: {
  error?: string | null;
  isLoading?: boolean;
  children: React.ReactNode;
}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black bg-opacity-50">
      <div className="shadow-lg z-[1001]" onClick={(e) => e.stopPropagation()}>
        {isLoading && <Loading />}
        {error && <div className="text-red-700 text-center pb-2">{error}</div>}
        {children}
      </div>
    </div>,
    document.body // Render modal outside of the root DOM node
  );
};

export default Modal;
