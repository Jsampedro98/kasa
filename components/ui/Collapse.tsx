"use client";

import { useState } from 'react';

interface CollapseProps {
  title: string;
  content: string | string[];
}

export default function Collapse({ title, content }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-8">
      <div 
        className="bg-main-red text-white rounded-[10px] md:rounded-[5px] h-[30px] md:h-[52px] flex items-center justify-between px-5 cursor-pointer z-20 relative"
        onClick={toggleCollapse}
      >
        <h3 className="font-medium text-[13px] md:text-lg">{title}</h3>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={`w-4 h-4 md:w-6 md:h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div 
        className={`bg-gray-100 rounded-b-[10px] md:rounded-b-[5px] overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pt-5 pb-2.5' : 'max-h-0 opacity-0 py-0'} -mt-3 relative z-10`}
      >
         <div className="px-5 text-main-red text-[12px] md:text-lg font-normal">
            {Array.isArray(content) ? (
                <ul className="list-none">
                    {content.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>{content}</p>
            )}
         </div>
      </div>
    </div>
  );
}
