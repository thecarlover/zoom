'use client'

import { SidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import React from 'react'



const Sidebar = () => {
  const pathname=usePathname();  
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {SidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

              return(
                <Link 
                href={item.route}
                key={item.label}
                className={cn(
                  'flex gap-4 items-center p-4 rounded-lg justify-start',
                  {
                    'bg-blue-1': isActive,
                  }
                )}

                
                >
                  {item.label}

                </Link>
              );

            })}
            
        </div>
        
    </section>
  );
};

export default Sidebar;