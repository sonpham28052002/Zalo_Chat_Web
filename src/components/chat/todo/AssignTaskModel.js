import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
import { IoCreateOutline } from 'react-icons/io5';
import './style.css';

function AssignTaskModel() {
    const [isVisible, setIsVisible] = useState(false);
    const leftValue = `calc((100vw - 450px) / 2)`;
    return (
        <div>
            <IoCreateOutline className="w-6 h-6 m-1 cursor-pointer" title="Giao việc" onClick={() => setIsVisible(!isVisible)} />
            <AnimatePresence>
                {isVisible && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50"
                            onClick={() => setIsVisible(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            style={{
                                position: 'fixed',
                                top: '20%',
                                left: leftValue,
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'white',
                                padding: '1em',
                                borderRadius: '10px',
                                zIndex: 1000,
                            }}
                        >
                            <div className='flex flex-col h-[510px] w-[450px]'>
                                <div>
                                    <div className="pl-6 bg-white flex flex-row justify-between mb-2">
                                        <p className="font-medium">Giao công việc mới</p>

                                        <div className=" flex text-xl font-medium mr-2 justify-center items-center h-7 w-7 btn-close" onClick={() => {
                                            setIsVisible(false);
                                        }}>
                                            <IoMdClose/>
                                        </div>
                                    </div>
                                    <div className='bg-gray-300 h-[1px]'></div>
                                    <div>
                                        <div className='pt-4 pb-2'>Tiêu đề</div>
                                        <input type="text" spellcheck="false" className="w-full h-10 border border-gray-300 rounded-md focus:outline-none  pl-2" placeholder="Nhập tiêu đề để dễ nhớ hơn. VD: Chuẩn bị báo cáo" maxlength="100" />
                                    </div>
                                    <div>
                                        <div className='pt-4 pb-2'>Nội dung</div>
                                        <textarea type="text" spellcheck="false" className="w-full h-20 border border-gray-300 rounded-md focus:outline-none p-2" placeholder="Nhập nội dung công việc " />
                                    </div>
                                    <div>
                                        <div className='pt-4 pb-2'>Giao cho</div>
                                        <input type="text" spellcheck="false" className="w-full h-10 border border-gray-300 rounded-md focus:outline-none  pl-2" />
                                    </div>
                                    <div>
                                        <div className='pt-4 pb-2'>Thời hạn</div>
                                        <input type="Date" className="w-full h-10 border border-gray-300 rounded-md focus:outline-none  pl-2" />
                                    </div>
                                    <div className="flex flex-row justify-end h-10 w-full mt-6">
                                        <button className="btn-request btn-blur-gray rounded mr-5">
                                            <p className="font-semibold">Hủy</p>
                                        </button>
                                        <button className="btn-request btn-blur-blue rounded ">
                                            <p className="font-semibold text-white ">Giao việc</p>
                                        </button>
                                    </div>

                                </div>

                            </div>


                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AssignTaskModel;
