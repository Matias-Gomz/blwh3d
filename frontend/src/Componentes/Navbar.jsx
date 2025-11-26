import React from 'react'
import logo from '../assets/logo.jpg'

export default function Navbar() {
  return (
     <nav className="relative w-full h-20 bg-gray-900 px-10  flex items-center justify-between text-xl">
      
      {/* IZQUIERDA */}
      <div className="flex gap-6 ">
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/contacto" >Contacto</a>
      </div>

      {/* LOGO CENTRADO */}
      <div className="h-full absolute left-1/2 -translate-x-1/2">
        <a href="/">
            <img src={logo} alt="logo" className="h-full select-none py-2"/>
        </a>
        

      </div>

      {/* DERECHA */}
      <div className="flex gap-6 ">
        <a href="/login"> Login</a>
        <a href="/perfil"> Perfil</a>
      </div>

    </nav>

    
  )
}
