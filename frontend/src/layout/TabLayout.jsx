import React from 'react';

export default function TabLayout({ tabs, children }) {
  return (
    <div>
      <div className="flex flex-row">{tabs.map((tab) => tab)}</div>
      <div>{children}</div>
    </div>
  );
}
