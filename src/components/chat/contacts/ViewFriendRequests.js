import { IoCaretDownOutline } from "react-icons/io5";
import { IoCaretForwardOutline } from "react-icons/io5";
import { SlEnvolopeLetter } from "react-icons/sl";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { useState } from "react";
import './style.css';

function ViewFriendRequests() {
    const requests = [
        { id: 1, name: 'Nguyễn Văn An', path: require('./asset/avatar8.png'), mess: "Xin chào, mình là Nguyễn Văn An. Kết bạn với mình nhé! Kết bạn với mình nhé! Kết bạn với mình nhé!" },
        { id: 2, name: 'Nguyễn Văn Cường', path: require('./asset/avatar9.png'), mess: "Xin chào, mình là Cường." }
    ];
    const recomments = [
        { id: 1, name: 'Nguyễn Văn An', path: 'https://img.pikbest.com/origin/09/19/03/61zpIkbEsTGjk.jpg!w700wp' },
        { id: 2, name: 'Nguyễn Văn Cường', path: require('./asset/avatar6.png') },
        { id: 3, name: 'Nguyễn Văn Nam', path: require('./asset/avatar4.png') },
        { id: 4, name: 'Nguyễn Thị Hoa ', path: require('./asset/avatar10.png') }
    ];

    const [isTurnOnRecomment, setTurnOnRecomment] = useState(false);
    

    function ListRequest({list}){
        return(
            <div className="flex flex-row w-full flex-wrap">
                {list.map(item => (
                    <div key={item.id} className="flex flex-col justify-around bg-white rounded mb-2 p-3 h-[200px] cursor-pointer request-item">
                        <div className="flex flex-row w-full">
                            <div className="img-avatar rounded-full bg-cover bg-center mr-4 w-[60px]" style={{ backgroundImage: `url(${item.path})` }}></div>
                            <div className="flex flex-col items-start overflow-hidden" >
                                <p className="text-base font-semibold truncate  overflow-ellipsis overflow-hidden">{item.name}</p>
                                <p className="text-sm text-gray-500">2 giờ</p>
                            </div>
                            <BiMessageRoundedDetail className="w-7 h-7 ml-auto" color="gray" />
                        </div>

                        <div className="bg-gray-200 w-full border border-gray-300 rounded p-2 h-[60px]">                            
                            <p className="text-sm text-left txt-request">{item.mess}</p>
                        </div>

                        <div className="flex flex-row justify-around h-10 w-full">
                            <button className="btn-request btn-blur-gray rounded">
                                <p className="font-semibold">Từ chối</p>
                            </button>
                            <button className="btn-request btn-blur-blue rounded">
                                <p className="font-semibold text-blue-600">Đồng ý</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    function ListRecomment({ list }) {
        return (
            <div className="flex flex-row w-full flex-wrap">
                {list.map(item => (
                    <div key={item.id} className="flex flex-col justify-around bg-white rounded mb-2 p-3 h-[150px] request-item cursor-pointer">
                        <div className="flex flex-row items-center">
                            <div className="img-avatar rounded-full bg-cover bg-center mr-4" style={{ backgroundImage: `url(${item.path})` }}></div>
                            <div className="flex flex-col items-start" >
                                <p className="text-base font-semibold overflow-hidden">{item.name}</p>
                                <p className="text-sm text-gray-500"> Có thể bạn quen</p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-around h-10 w-full">
                            <button className="btn-request btn-blur-gray rounded">
                                <p className="font-semibold">Bỏ qua</p>
                            </button>
                            <button className="btn-request btn-blur-gray rounded">
                                <p className="font-semibold">Kết bạn</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-row h-16 items-center">
                <div className="w-16">
                    <SlEnvolopeLetter className="w-5 h-5 mx-auto" />
                </div>
                <div className="font-semibold">
                    Lời mời kết bạn
                </div>
            </div>
            <hr></hr>
            <div className="flex flex-1 bg-gray-100 scrollable-div flex-col" >
                <div className="txt-contacts items-center" >
                    <p className="text-sm font-semibold pb-3">Lời mời đã nhận ({requests.length})</p>
                    <ListRequest  list={requests}/>
                </div>

                <div className="txt-contacts items-center " >
                    <button className="text-sm font-semibold flex flex-row items-center mb-3"
                        onClick={() => setTurnOnRecomment(!isTurnOnRecomment)}
                    >
                        Gợi ý kết bạn ({recomments.length})
                        {isTurnOnRecomment ?
                            <IoCaretDownOutline className="w-4 h-4" color="gray" /> :
                            <IoCaretForwardOutline className="w-4 h-4" color="gray" />
                        }
                    </button>

                    {isTurnOnRecomment && <ListRecomment list={recomments} />}
                </div>
            </div>
        </div>
    )
}

export default ViewFriendRequests;