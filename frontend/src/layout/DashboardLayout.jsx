import React from 'react';
import Logo from '../assets/Logo.svg';

export default function DashboardLayout({ sidebarButtons, children }) {
  return (
    <div className="bg-slate-700 min-w-full min-h-screen flex">
      <nav className="min-w-fit bg-slate-700">
        <div className="flex flex-col justify-center items-center mt-8">
          <img src={Logo} alt="Railway Express Logo" />
          <h1 className="font-serif text-3xl text-slate-100 text-center p-8 pt-0 m-0 my-4">
            Railway Express
          </h1>
        </div>
        <div className="flex flex-col">
          {sidebarButtons.map((SidebarButton) => SidebarButton)}
        </div>
      </nav>
      <main className="bg-slate-100 min-h-full w-full m-5 ml-0 p-10 rounded-3xl">
        {children}
      </main>
    </div>
  );
}
