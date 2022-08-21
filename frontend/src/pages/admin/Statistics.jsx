import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import StatCard from 'components/StatCard';

export default function Statistics() {
  return (
    <AdminLayout>
      <h1 className="">Statistics</h1>
      <div>
        <h2>User Count</h2>
        <div className="w-full flex gap-6 flex-wrap">
          <StatCard name="Control Officer" count="3" />
          <StatCard name="Ticketing Officer" count="200" />
          <StatCard name="Crew Members" count="300" />
          <StatCard name="Ticket Checkers" count="150" />
          <StatCard name="Passengers" count="1000" />
        </div>
      </div>
      <div>
        <h2>Tickets</h2>
        <div className="w-full flex gap-6 flex-wrap">
          <StatCard name="Tickets Sold" count="3000" />
          <StatCard name="Seats Reserved" count="1500" />
        </div>
      </div>
      <div>
        <h2>Income</h2>
        <div className="w-full flex gap-6 flex-wrap">
          <StatCard name="Yesterday" count="Rs.300,000" />
          <StatCard name="Last Weak" count="Rs.2,100,000" />
          <StatCard name="Last Month" count="Rs.8,400,000" />
        </div>
      </div>
    </AdminLayout>
  );
}
