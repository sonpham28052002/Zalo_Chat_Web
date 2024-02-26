import React, { Fragment, useState } from "react";
import { LuSticker } from "react-icons/lu";
import { Menu, Transition } from "@headlessui/react";
import { PickerComponent} from "stipop-react-sdk";

export default function Sticker(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu
        as="div"
        className="relative"
      >
        <div>
          <Menu.Button className="h-9 w-9 rounded-md hover:bg-slate-100 flex flex-row items-center justify-center mr-2">
            <LuSticker className="text-2xl" />
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
          <Menu.Items className="absolute p-3 bottom-12 left-3 z-10 mt-2 w-fit">
            <PickerComponent 
              params={{
                apikey: "aca479289a446a42a376ad930c5a2206",
                userId: "472930424623749023489270",
              }}
              storeClick={(click) => console.log(click)}
              stickerClick={(url) => console.log(url)}
            />
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
