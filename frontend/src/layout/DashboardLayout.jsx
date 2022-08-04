import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-slate-700 min-w-full min-h-screen flex">
      <nav className="min-w-fit bg-slate-700">
        <h1 className="font-serif text-3xl text-slate-100 text-center p-8">
          Railway Express
        </h1>
        <div className="flex flex-col">
          <NavLink
            to="/admin/stats"
            style={({ isActive }) =>
              isActive ? { color: 'white' } : { color: 'inherit' }
            }
          >
            Statistics
          </NavLink>
          <NavLink
            to="/admin/manage-users"
            style={({ isActive }) =>
              isActive ? { color: 'white' } : { color: 'inherit' }
            }
          >
            Manage Users
          </NavLink>
        </div>
      </nav>
      <main className="bg-slate-100 min-h-full w-full m-5 ml-0 p-10 rounded-3xl">
        {children}
      </main>
    </div>
  );
}
