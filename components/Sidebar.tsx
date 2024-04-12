'use client'

import { SidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';

import { usePathname } from 'next/navigation';
import React from 'react'



const Sidebar = () => {
  const pathname=usePathname();  
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {SidebarLinks.map((link) => {
              const isActive=pathname===link.route||pathname.startsWith(link.route);


              return(
                <Link 
                  href={link.route}
                  key={link.label}
                  className={cn('flex items-center gap-4 p-4 rounded-md',isActive?'bg-blue-1':'hover:bg-dark-2')}

                
                >
                  {link.label}

                </Link>
              )

            })}
            
        </div>
        
    </section>
  )
}

export default Sidebar;