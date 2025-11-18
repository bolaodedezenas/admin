"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
// icons 
import { IoClose, IoChatboxOutline } from 'react-icons/io5';
import { FaGear } from 'react-icons/fa6';
import { IoMdNotifications, IoIosArrowForward } from 'react-icons/io';
// components
import Dropdown from "@/components/Dropdown";
// utils
import { getRecentItems, removeRecentItem } from '@/utils/saveRecentItem';

export default function Header() {
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const [recentItems, setRecentItems] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const res = getRecentItems();
    setItems(res);
    setRecentItems(true);
  }, [recentItems]);

  const deleteItem = (href) => {
    removeRecentItem(href);
    setItems(getRecentItems()); // atualiza lista
  };

   if (!user) return null;

 
  
  const userName = user.name?.split(" ")[0] || user.displayName?.split(" ")[0] || "usuário";
  const photoURL = user.photoURL

  return (
    <header
      className=' 
        w-full 
        bg-[rgb(var(--text-blue))]
        relative z-50  
        text-[rgb(var(--white))]
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
      <nav className=' w-full flex  items-center justify-between border-y-2 p-1 flex-wrap border-gray-400  pl-10 '>
        <section className='flex gap-10 mr-10'>
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Financeiro'
            items={[
              { label: 'Relatórios 01', href: '/01' },
              { label: 'Pagamentos 02', href: '/02' },
            ]}
          />
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Jogos'
            items={[
              { label: 'Relatórios 03', href: '/03' },
              { label: 'Pagamentos 04', href: '/04' },
            ]}
          />
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Usuários'
            items={[
              { label: 'Relatórios 05', href: '/05' },
              { label: 'Pagamentos 06', href: '/06' },
            ]}
          />
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Sorteios'
            items={[
              { label: 'Relatórios 07', href: '/07' },
              { label: 'Pagamentos 08', href: '/08' },
            ]}
          />
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Ganhadores'
            items={[
              { label: 'Relatórios 09', href: '/09' },
              { label: 'Pagamentos 10', href: '/10' },
            ]}
          />
          <Dropdown
            setRecentItems={setRecentItems}
            recentItems={recentItems}
            title='Dashboards'
            items={[
              { label: 'Relatórios 11', href: '/11' },
              { label: 'Pagamentos 12', href: '/12' },
            ]}
          />
        </section>
        <div className='flex pr-10'>
          <input
            type='text'
            className=' bg-[rgb(var(--white))] p-1 cursor-pointer w-60 placeholder: text-gray-500 pl-5'
            placeholder='O que você procura?'
          />
          <IoIosArrowForward className='bg-[rgb(var(--blue-500))] p-1 text-[2.2rem] cursor-pointer' />
        </div>
      </nav>
      <section className='w-full  flex pl-10  pt-2  '>
        <div className={`w-full flex items-center  gap-2 pr-10 `}>
          {items.map((item) => (
            <div
              key={item.href}
              className={`
              border-b-6 
              pl-2 pr-2
              ${
                item.href === '/12'
                  ? ' border-[rgb(var(--blue-50))]'
                  : ' border-[rgb(var(--blue-700))]'
              }
              ${
                item.href === '/12' //comparar com url
                  ? ' bg-[rgb(var(--blue-50))]'
                  : ' bg-[#d9d9d9]'
              }
              transition-colors duration-500 h-10
              min-w-[35px] max-w-[250px] hover:bg-[rgb(var(--blue-50))]
              flex gap-0 items-center justify-center text-[rgb(var(--text-blue))] cursor-pointer
              `}
            >
              <div
                className='truncate min-w-0 max-sm:hidden'
                onClick={() => router.push(item.href)}
              >
                {item.label}
              </div>
              <div>
                <IoClose
                  onClick={() => {
                    deleteItem(item.href);
                    stopPropagation();
                  }}
                  className='text-[1.5rem]'
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </header>
  );
}

