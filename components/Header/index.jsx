"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
// icons 
import { IoClose, IoChatboxOutline } from 'react-icons/io5';
import { FaGear } from 'react-icons/fa6';
import { IoMdNotifications, IoIosArrowForward } from 'react-icons/io';


export default function Header() {
  const perfil = JSON.parse(localStorage.getItem("Photo")) || null;
  const { user, handleLogout } = useAuth();

  if (!user) return null;
  

  const userName = user.name?.split(" ")[0] || user.displayName?.split(" ")[0] || "usuário";
  const photoURL = user.photoURL

  return (
    <header
      className=' 
        w-full 
        bg-[rgb(var(--text-blue))]  
      '
    >
      <div
        className=' w-full flex justify-between
        p-2 pl-10 pr-10'
      >
        <div className=' flex gap-6 text-[1.7rem]'>
          <IoChatboxOutline className='cursor-pointer' />
          <FaGear className='cursor-pointer' />
          <IoMdNotifications className='cursor-pointer' />
        </div>
        <h2 className=' font-medium text-[1.2rem]'>
          Bolão de Dezenas - Versão 0.0.1
        </h2>
        <IoClose
          onClick={() => handleLogout()}
          className='text-[2rem] cursor-pointer'
        />
      </div>
      <nav className=' w-full flex items-center justify-between border-y-2 border-gray-400 p-2'>
        <ul className='flex gap-10 pl-10'>
          <li className='cursor-pointer'>Menu 1</li>
          <li className='cursor-pointer'>Menu 2</li>
          <li className='cursor-pointer'>Menu 3</li>
          <li className='cursor-pointer'>Menu 4</li>
          <li className='cursor-pointer'>Menu 5</li>
          <li className='cursor-pointer'>Menu 6</li>
        </ul>
        <div className='flex pr-10'>
          <input
            type='text'
            className=' bg-[rgb(var(--white))] p-1 cursor-pointer w-70 placeholder: text-gray-500 pl-5'
            placeholder='O que você procura?'
          />
          <IoIosArrowForward className='bg-[rgb(var(--blue-500))] p-1 text-[2.2rem] cursor-pointer' />
        </div>
      </nav>
      <div className='w-full flex pl-10 pr-10 pt-2 '>
        <div className='flex items-center justify-between  min-w-[200px] bg-[#d9d9d9]  pl-3 pr-1 text-[rgb(var(--text-blue))] cursor-pointer'>
          Opção aberta
          <IoClose onClick={() => handleLogout()} className='text-[2rem]' />
        </div>
      </div>
    </header>
  );
}
