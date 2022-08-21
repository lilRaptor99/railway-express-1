import React from 'react';

export default function StatCard({ name, count }) {
  return (
    <div className="min-w-max max-w-xs w-60 rounded-2xl overflow-hidden shadow-md bg-slate-200 items-start">
      <div className="px-4 py-2 text-left">
        <p className="font-medium m-2">{name}</p>
        <p className="text-5xl font-light m-2">{count}</p>
      </div>
    </div>
  );
}
