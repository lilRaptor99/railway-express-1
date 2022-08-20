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
} from '@mui/material';

export default function ManageUsers() {
  const [userDetails, setUserDetails] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setUserDetails((preUserDetails) => {
      return preUserDetails.filter((user) => user.role === event.target.value);
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      const res = await request('get', '/admin/user', {});
      setUserDetails(res.data);
    } catch (e) {
      console.error('Get user list error:', e);
    }
  }

  async function searchUser(searchTerm) {
    console.log(searchTerm);
    try {
      const res = await request('get', `/admin/user/search/${searchTerm}`, {});
      setUserDetails(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AdminLayout>
      <TabLayout
        tabs={[
          <Tab
            key="{System Users}"
            name="System Users  |"
            linkTo="/admin/manage/users"
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
              <MenuItem value="PASSENGER">Passenger</MenuItem>
            </Select>
          </div>
        </div>
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
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.nic}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabLayout>
    </AdminLayout>
  );
}
