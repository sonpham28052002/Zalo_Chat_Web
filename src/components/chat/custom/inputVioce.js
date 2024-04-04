import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { RiSendPlaneFill } from "react-icons/ri";
import { VoiceVisualizer, useVoiceVisualizer } from "react-voice-visualizer";
import { uploadAudio } from "../../../services/Azure_Service";

export default function InputVioce(props) {
  var [isStart, setIsStart] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const recorderControls = useVoiceVisualizer();
  const {
    // ... (Extracted controls and states, if necessary)
    recordedBlob,
    error,
    audioRef,
  } = recorderControls;

  // Get the recorded audio blob

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);
  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            className="h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
            onClick={() => {
              setIsStart(!isStart);
            }}
          >
            <MdOutlineKeyboardVoice className="text-2xl" />
          </Menu.Button>
        </div>
        <Transition as={Fragment} show={isStart}>
          <Menu.Items className="absolute p-3 bottom-28 right-[500px] z-10 w-fit">
            <div className="h-64 w-96 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center">
              <div className=" absolute -top-0 -right-1">
                <IoMdClose
                  className="hover:text-red-600 text-xl"
                  onClick={() => {
                    setIsStart(false);
                    recorderControls.stopRecording();
                    recorderControls.mediaRecorder = undefined;
                  }}
                />
              </div>

              <VoiceVisualizer
                ref={audioRef}
                height={20}
                width={200}
                controls={recorderControls}
                mainBarColor="red"
              />
              <button
                className="min-h-10 w-1/2 flex flex-row justify-center items-center rounded-md mb-3 bg-[#1a8dcd] text-white font-bold"
                onClick={async () => {
                  if (!recordedBlob) return;
                  let url = await uploadAudio(recordedBlob);
                  console.log(url);
                  setIsStart(false);
                }}
              >
                Gửi ghi âm
                <RiSendPlaneFill className="text-2xl mx-5" />
              </button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
