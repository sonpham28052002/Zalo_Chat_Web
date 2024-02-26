import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

export default function Emoji(props) {
  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <MdOutlineEmojiEmotions className="text-2xl" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute p-3 bottom-10 right-0 z-10 w-fit">
            <Menu.Item>
              <EmojiPicker />
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
