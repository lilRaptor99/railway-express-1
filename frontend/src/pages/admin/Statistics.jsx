import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import StatCard from 'components/StatCard';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import request from 'utils/request';
import { CircularProgress } from '@mui/material';

export default function Statistics() {
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);

  useEffect(() => {
    (async () => {
      const resTicket = await request('GET', '/admin/stats/ticket');
      setTicketData(resTicket.data);
      const resUser = await request('GET', '/admin/stats/user');
      setUserData(resUser.data);
      const resIncome = await request('GET', '/admin/stats/income');
      setIncomeData(resIncome.data);
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="">Statistics</h1>
      <div>
        <h2>User Count</h2>
        {!userData && (
          <div className="flex justify-center w-full">
            <CircularProgress className="mt-5 text-slate-500" />
          </div>
        )}

        {userData && (
          <div>
            <div className="w-full flex gap-6 flex-wrap">
              <StatCard
                name="Control Officer"
                count={userData?.countByType[2]?._count}
              />
              <StatCard
                name="Ticketing Officer"
                count={userData?.countByType[3]?._count}
              />
              <StatCard
                name="Crew Members"
                count={userData?.countByType[5]?._count}
              />
              <StatCard
                name="Ticket Checkers"
                count={userData?.countByType[4]?._count}
              />
              <StatCard
                name="Passengers"
                count={userData?.countByType[1]?._count}
              />
            </div>
            <div className="flex flex-wrap gap-8 my-8">
              <BarChart width={400} height={300} data={userData?.countByType}>
                <XAxis dataKey="role" />
                <YAxis />
                <Bar
                  dataKey="_count"
                  barSize={30}
                  fill="#475569"
                  label={({ value }) => {
                    console.log('palo', value);
                    return <p>sdf</p>;
                  }}
                />
              </BarChart>

              <LineChart width={600} height={300} data={userData?.countByDate}>
                <Line type="monotone" dataKey="count" stroke="#475569" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="date"
                  // label="Date"
                />
                <YAxis
                // label="Tickets"
                />
              </LineChart>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2>Tickets</h2>
        {!ticketData && (
          <div className="flex-shrink-0 justify-center w-full">
            <CircularProgress className="mt-5 text-slate-500" />
          </div>
        )}
        {ticketData && (
          <div>
            <div className="w-full flex gap-6 flex-wrap">
              <StatCard
                name="Tickets Sold"
                count={
                  ticketData?.countByType[0]?._count +
                  ticketData?.countByType[1]?._count
                }
              />
              <StatCard
                name="Seats Reserved"
                count={ticketData?.countByType[2]?._count}
              />
            </div>
            <div className="flex flex-wrap gap-8 my-8">
              <BarChart width={350} height={300} data={ticketData?.countByType}>
                <XAxis dataKey="ticketType" />
                <YAxis />
                <Bar dataKey="_count" barSize={30} fill="#475569" />
              </BarChart>

              <LineChart
                width={600}
                height={300}
                data={ticketData?.countByDate}
              >
                <Line type="monotone" dataKey="count" stroke="#475569" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="date"
                  // label="Date"
                />
                <YAxis
                // label="Tickets"
                />
              </LineChart>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2>Income</h2>
        {!incomeData && (
          <div className="flex-shrink-0 justify-center w-full">
            <CircularProgress className="mt-5 text-slate-500" />
          </div>
        )}
        {incomeData && (
          <div>
            <div className="w-full flex gap-6 flex-wrap">
              <StatCard
                name="Today"
                count={
                  'LKR ' + incomeData?.countByDate.at(-1)?.price.toFixed(2)
                }
              />
              <StatCard
                name="Yesterday"
                count={
                  'LKR ' + incomeData?.countByDate.at(-2)?.price.toFixed(2)
                }
              />
              <StatCard
                name="This Month"
                count={
                  'LKR ' + incomeData?.countByMonth?.at(-1)?.price.toFixed(2)
                }
              />
            </div>
            <div className="flex flex-wrap gap-8 my-8">
              <BarChart width={350} height={300} data={incomeData?.countByType}>
                <XAxis dataKey="ticketType" />
                <YAxis />
                <Bar dataKey="_sum.price" barSize={30} fill="#475569" />
              </BarChart>

              <LineChart
                width={600}
                height={300}
                data={incomeData?.countByDate}
              >
                <Line type="monotone" dataKey="price" stroke="#475569" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="date"
                  // label="Date"
                />
                <YAxis
                // label="Tickets"
                />
              </LineChart>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
