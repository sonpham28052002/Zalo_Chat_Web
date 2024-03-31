import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function InputVioce(props) {
  var [isStart, setIsStart] = useState(false);

  const recorderControls = useAudioRecorder({});
  useEffect(() => {
    if (isStart === false) {
      recorderControls.stopRecording();
    }
  }, [isStart, recorderControls]);
  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            className="h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2"
            onClick={() => {
              recorderControls.startRecording();
              setIsStart(!isStart);
            }}
          >
            <MdOutlineKeyboardVoice className="text-2xl" />
          </Menu.Button>
        </div>
        <Transition as={Fragment} show={isStart}>
          <Menu.Items className="absolute p-3 bottom-28 right-[500px] z-10 w-fit">
            <div className="h-24 w-96 bg-white rounded-2xl shadow-2xl flex flex-row justify-center items-center">
              <div className=" absolute -top-0 -right-1">
                <IoMdClose
                  className="hover:text-red-600 text-xl"
                  onClick={() => {
                    setIsStart(false);
                  }}
                />
              </div>

              <AudioRecorder
                onRecordingComplete={() => {
                  console.log("aaaaaa");
                }}
                recorderControls={recorderControls}
                showVisualizer={true}
              />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
