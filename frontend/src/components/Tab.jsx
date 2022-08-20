import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Tabs({ name, linkTo }) {
  return (
    <NavLink
      to={linkTo}
      style={({ isActive }) =>
        isActive ? { color: 'black' } : { color: '#065b8d' }
      }
      className="no-underline"
    >
      <div className="flex items-center mr-2 mb-3">
        <div className="text-lg">{name}</div>
      </div>
    </NavLink>
  );
}
