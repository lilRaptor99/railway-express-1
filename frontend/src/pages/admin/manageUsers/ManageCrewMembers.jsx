import TabLayout from '../../../layout/TabLayout';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/AdminLayout';
import Tab from 'components/Tab';
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
import SearchBar from 'components/SearchBar';

export default function ManageCrewMembers() {
  const [crewMemberDetails, setCrewMemberDetails] = useState([]);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    setCrewMemberDetails((preUserDetails) => {
      return preUserDetails.filter(
        (user) => user.occupation === event.target.value
      );
    });
  };

  useEffect(() => {
    getCrewMemberDetails();
  }, []);

  async function getCrewMemberDetails() {
    try {
      const res = await request('get', '/admin/crew-member', {});
      setCrewMemberDetails(res.data);
    } catch (e) {
      console.error('Get crew member list error:', e);
    }
  }

  async function searchCrewMember(searchTerm) {
    console.log(searchTerm);
    try {
      const res = await request(
        'get',
        `/admin/crew-member/search/${searchTerm}`,
        {}
      );
      setCrewMemberDetails(res.data);
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
          <SearchBar handleSearch={searchCrewMember} />
          <div className="w-40">
            <Select
              labelId="select"
              id="role-select"
              value={value}
              onChange={handleChange}
              className="ml-10 h-14 my-4 min-w-full rounded-2xl"
            >
              <MenuItem value="DRIVER">Driver</MenuItem>
              <MenuItem value="DRIVER_ASSISTANT">Driver Assistant</MenuItem>
              <MenuItem value="HEAD_GUARD">Head Guard</MenuItem>
              <MenuItem value="UNDER_GUARD">Under Guard</MenuItem>
            </Select>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Station</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crewMemberDetails.map((user) => (
              <TableRow
                key={user.userId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.nic}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.occupation}</TableCell>
                <TableCell>{user.stationId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabLayout>
    </AdminLayout>
  );
}
