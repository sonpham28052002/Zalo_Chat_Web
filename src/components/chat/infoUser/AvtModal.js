import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { updateUserInfo } from "../../../services/User_service";
export default function AvtModal({ isOpen, setIsOpen, url }) {
  var owner = useSelector((state) => state.data);

  const handleUpdateAvt = async () => {
    let infoUpdateUser = { ...owner };
    infoUpdateUser.avt = url;
    try {
      await updateUserInfo(infoUpdateUser);
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      alert("Thao tác thất bại, vui lòng thử lại sau");
      return;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer "
        >
          <motion.div
            key={"ImageModal"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center"
          >
            <div className="z-10 w-96">
              <div className="pl-6 h-9 bg-white flex flex-row items-center justify-between ">
                <h1 className="font-medium">Cập nhật ảnh đại diện</h1>
                <IoMdClose
                  className="text-xl font-medium mr-2 hover:text-red-600"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
              <hr></hr>
              <div className="h-full w-96 mr-1 flex flex-col items-center px-14 relative bg-white">
                <img className="bg-white" alt="." src={url} />
                <div className="flex flex-row justify-around h-10 w-full mt-5">
                  <button className="btn-request btn-blur-gray rounded">
                    <p className="font-semibold">Hủy</p>
                  </button>
                  <button
                    className="btn-request btn-blur-blue rounded"
                    onClick={() => {
                      handleUpdateAvt();
                    }}
                  >
                    <p className="font-semibold text-white">Cập nhật</p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
