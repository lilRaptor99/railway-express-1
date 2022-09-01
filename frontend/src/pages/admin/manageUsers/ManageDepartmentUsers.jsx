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
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

let userDetailsArr = [];

export default function ManageDepartmentUsers() {
  const [userDetails, setUserDetails] = useState([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
    setUserDetails((preUserDetails) => {
      return userDetailsArr.filter((user) => user.role === event.target.value);
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      const res = await request('get', '/admin/user', {});
      userDetailsArr = res.data;
      setUserDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get user list error:', e);
    }
  }

  async function searchUser(searchTerm) {
    setIsLoading(true);
    console.log(searchTerm);
    try {
      const res = await request('get', `/admin/user/search/${searchTerm}`, {});
      userDetailsArr = res.data;
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
            <TableCell>NIC</TableCell>
            <TableCell>Role</TableCell>
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
                  to={`profile/${user.userId}`}
                  className="no-underline my-0 text-slate-500 hover:underline"
                >
                  {user.firstName} {user.lastName}
                </Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.nic}</TableCell>
              <TableCell>{user.role}</TableCell>
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
        <div className="flex flex-row flex-wrap">
          <SearchBar handleSearch={searchUser} />
          <div className="w-40">
            <Select
              labelId="select"
              id="role-select"
              value={value}
              onChange={handleChange}
              className="ml-10 h-14 my-4 min-w-full rounded-2xl"
            >
              <MenuItem value="CONTROL_OFFICER">Control Officer</MenuItem>
              <MenuItem value="TICKETING_OFFICER">Ticketing Officer</MenuItem>
              <MenuItem value="TICKET_CHECKER">Ticket Checker</MenuItem>
            </Select>
          </div>
        </div>
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
