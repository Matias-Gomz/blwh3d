import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Componentes/Navbar'
import fotofnaf from './assets/fnaf poster.png'
import ImgSolapadas from './Componentes/ImgSolapadas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body class="overflow-x-hidden">
        <Navbar></Navbar>        
        
        <ImgSolapadas/>

        
        
      </body>

      
    </>
  )
}

export default App
