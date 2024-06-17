import toast from "react-hot-toast";

export  const customInfoToast = (message) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } px-1 py-2 bg-white shadow-lg justify-center items-center rounded-xl pointer-events-auto flex ring-2 ring-violet-600`}
    >
      <div className="text-base text-center w-5 h-5 rounded-3xl ring-2 ring-violet-600 text-violet-600 mx-1">
        <p className="mb-3">!</p>
      </div>

      <div className="relative flex text-center">
        <p className="text-sm font-semibold text-violet-600">{message}</p>
      </div>
    </div>
  ));
};
