import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

export default function Emoji({ text, setText }) {
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
        >
          <Menu.Items className="absolute p-3 bottom-10 right-0 z-10 w-fit">
              <EmojiPicker
                onEmojiClick={(e) => {
                  let newText = text + e.emoji;
                  console.log(newText)
                  setText(newText);
                }}
              />
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
