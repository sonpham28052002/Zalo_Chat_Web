import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function SignUpPreviewInfoForm() {
    const history = useNavigate();
    const location = useLocation();
    var account = location.state.account;
    return (
        <div className="h-full w-1/2 mr-1 flex flex-col items-center pt-5 px-14 relative">
            <img
                src={account.avt}
                className="h-36"
                alt="/"
            ></img>
            <h1 className="font-bold text-3xl text-center pb-7">THÔNG TIN CỦA BẠN</h1>

            <form className="w-full flex flex-col justify-center">
                <div className="pb-3">
                    <label className="font-medium w-[400px]">Họ tên: </label>
                    <label>{account.userName}</label>
                </div>
                <div className="pb-3">
                    <label className="font-medium">Số điện thoại: </label>
                    <label>{account.phone}</label>
                </div>
                <div className="pb-3">
                    <label className="font-medium">Ngày sinh: </label>
                    <label>{account.dob}</label>
                </div>
                <div className="pb-3">
                    <label className="font-medium">Giới tính: </label>
                    <label>{account.gender}</label>
                </div>
                <p className="font-medium text-center pb-5">Đăng ký thành công. Vui lòng đăng nhập lại để tham gia cùng chúng tôi</p>
                <button
                    onClick={async () => {                        
                        history(`/`,);
                    }}
                    type="button"
                    className="min-h-10 w-full rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
                >Quay lại đăng nhập</button>

            </form>
        </div>

    )

}