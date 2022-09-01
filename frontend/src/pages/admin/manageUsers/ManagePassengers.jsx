import TabLayout from '../../../layout/TabLayout';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import Tab from 'components/Tab';
import SearchBar from 'components/SearchBar';
import request from 'utils/request';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ManagePassengers() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      const res = await request('get', '/admin/passenger', {});
      setUserDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get passenger list error:', e);
    }
  }

  async function searchUser(searchTerm) {
    setIsLoading(true);
    console.log(searchTerm);
    try {
      const res = await request(
        'get',
        `/admin/passenger/search/${searchTerm}`,
        {}
      );
      setUserDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  function detailTable() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>NIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails.map((user) => (
            <TableRow
              key={user.userId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="hidden">{user.userId}</TableCell>
              <TableCell>
                <Link
                  color="#065b8d"
                  to={`profile/${user.userId}`}
                  className="no-underline my-0 text-slate-500 hover:underline"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.nic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <AdminLayout>
      <TabLayout
        tabs={[
          <Tab
            key="{Department Users}"
            name="Department Users  |"
            linkTo="/admin/manage/department-users"
          />,
          <Tab
            key="{Passengers}"
            name="Passengers    |"
            linkTo="/admin/manage/passengers"
          />,
          <Tab
            key="{Crew Members}"
            name="Crew Members"
            linkTo="/admin/manage/crew-members"
          />,
        ]}
      >
        <SearchBar handleSearch={searchUser} />
        <div className="flex justify-center w-full">
          {isLoading ? (
            <CircularProgress className="mt-5 text-slate-500" />
          ) : (
            detailTable()
          )}
        </div>
      </TabLayout>
    </AdminLayout>
  );
}
