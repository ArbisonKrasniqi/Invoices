import { useState, useEffect } from "react";

const InvoiceDiv = (props) => {

const [screenHeight, setScreenHeight] = useState(0);
useEffect(() => {
    setScreenHeight(window.screen.height);
}, [window.screen.height]);

const aspectRatio = 210 / 279;
const divWidth = screenHeight * aspectRatio;
  
return (
    <div
    className= 'font-sans text-gray-800 shadow-md p-6'
    style={{
        height: `${screenHeight}px`,
        width: `${divWidth}px`,
    }}
    >
        {props.children}
    </div>
);
}

export default InvoiceDiv;