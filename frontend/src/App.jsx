import { useState } from 'react'
import Navbar from './components/Navbar'
import Left from './components/Left'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Portfolio from './components/Portfolio'
import Mystocks from './components/Mystocks'
import Settings from './components/Settings'
import Help from './components/Help'

function App() {
  const [details, setDetails] = useState({
    name: 'Pajji Bkl',
    email: 'bkl@gmail.com',
    img: "./pajji_image.jpg",
  })
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar details={details}/><Left/> <div className="bottom"> <Dashboard /></div> </>
    },
    {
      path: "/Portfolio",
      element: <><Navbar details={details}/> <Left/> <div className="bottom"> <Portfolio /></div></>
    },
    {
      path: "/mystocks",
      element: <><Navbar details={details}/><Left/> <div className="bottom"> <Mystocks /></div> </>
    },
    {
      path: "/settings",
      element: <><Navbar details={details}/> <Left /> <div className="bottom"><Settings/></div> </>
    },
    {
      path: "/help",
      element: <><Navbar details={details}/> <Left /> <div className="bottom"><Help/> </div></>
    },
  ])
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
