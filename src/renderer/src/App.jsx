import React from "react";
import {GlobalProvider} from "./GlobalContext.jsx";
import SideBar from "./components/SideBar/SideBar.jsx";
import Pages from "./Pages/Pages";
function App() {
  return (
    <>
      <GlobalProvider>
          <div className='flex flex-row h-100%'>
              <SideBar/>
              <Pages/>
          </div>

      </GlobalProvider>
    </>
  )
}

export default App
