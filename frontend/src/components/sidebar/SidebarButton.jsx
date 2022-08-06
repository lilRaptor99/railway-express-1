import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SidebarButton({ name, linkTo, icon }) {
  return (
    <NavLink
      to={linkTo}
      style={({ isActive }) =>
        isActive
          ? { color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.06)' }
          : { color: '#94a3b8' }
      }
      className="no-underline"
    >
      <div className="h-14  flex gap-x-6 items-center  hover:bg-slate-600">
        <div className="ml-7 text-2xl flex place-items-center">{icon}</div>
        <div className="text-lg ">{name}</div>
      </div>
    </NavLink>
  );
}
