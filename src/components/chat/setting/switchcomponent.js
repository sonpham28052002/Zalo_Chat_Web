import React from 'react'
import GeneralSetting from "./GeneralSetting";
import Theme from "./theme";
import Notification from "./Notification";
import Message from "./Message";
export default function Switchcomponent({value}) {
    switch (value) {
        case 0: return <GeneralSetting/> 
        case 1: return <Theme/>
        case 2: return <Notification/>
        case 3: return <Message/>
        case 4: return <GeneralSetting/>
        default: return
    }
}
