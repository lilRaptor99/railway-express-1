import React, { useEffect, useState } from 'react';
import request from 'utils/request';
import AdminLayout from '../../../layout/AdminLayout';
import {
  Alert,
  Avatar,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableRow,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/Button';
import { Close } from '@mui/icons-material';
import { useCallback } from 'react';

export default function ProfileCrewMember() {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = useParams().id;
  const [isActive, setActive] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await request(
        'get',
        `/admin/crew-member/profile/${userId}`,
        {}
      );
      console.log(res.data);
      setUserDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get crew member details error:', e);
    }
  }, [userId]);

  const deleteCrewMember = useCallback(async () => {
    try {
      await request('put', `/admin/crew-member/delete/${userId}`, {});
      setDeleteSuccess(true);
      setTimeout(() => {
        navigate('/admin/manage/crew-members');
      }, 2000);
    } catch (e) {
      if (e?.response?.status === 500) {
        setDeleteError('Error deleting crew member');
        console.error('Delete crew member error:', e);
      } else {
        console.log(e?.response?.data);
        setDeleteError(e?.response?.data?.errors[0]);
      }
    }
  }, [navigate, userId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const toggleClass = () => {
    setActive(!isActive);
  };

  function setUserOccupation(role) {
    switch (role) {
      case 'HEAD_GUARD':
        return 'Head Guard';
      case 'UNDER_GUARD':
        return 'Under Guard';
      case 'DRIVER':
        return 'Driver';
      case 'DRIVER_ASSISTANT':
        return 'Driver Assistant';
      default:
        return;
    }
  }

  function detailTable(user) {
    return (
      <div className="flex flex-row flex-wrap justify-start w-full mt-5">
        <div className="flex flex-col items-center w-1/3">
          <Avatar sx={{ width: 150, height: 150 }} className="text-5xl">
            {user?.firstName[0]}
            {user?.lastName[0]}
          </Avatar>
          <h1 className="font-light m-0 mt-2">
            {user?.firstName} {user?.lastName}
          </h1>
          <h2 className="m-0 mt-1 font-light">
            {setUserOccupation(user?.occupation)}
          </h2>
        </div>
        <div className="w-2/3">
          <Table>
            <TableRow>
              <TableCell className="font-medium">Id</TableCell>
              <TableCell>{user?.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Phone Number</TableCell>
              <TableCell>{user?.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Address</TableCell>
              <TableCell>{user?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">NIC</TableCell>
              <TableCell>{user?.nic}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Station</TableCell>
              <TableCell>{user?.station.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Station Id</TableCell>
              <TableCell>{user?.stationId}</TableCell>
            </TableRow>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mt-0">Profile</h1>

      <div className="mb-4">
        <Collapse in={Boolean(deleteError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Error deleting crew member
          </Alert>
        </Collapse>

        <Collapse in={Boolean(deleteSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setDeleteSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Crew member deleted successfully.
          </Alert>
        </Collapse>
      </div>

      {isLoading ? (
        <div className="flex justify-center w-full">
          <CircularProgress className="mt-5 text-slate-500" />
        </div>
      ) : (
        detailTable(userDetails)
      )}

      <div className="flex justify-center w-full mt-10">
        <Button
          type="button"
          isLoading={false}
          onClick={toggleClass}
          className={isActive ? 'hidden' : 'block'}
          color="error"
          variant="outlined"
        >
          Delete Crew Member
        </Button>
      </div>

      <div className={isActive ? 'flex justify-center' : 'hidden'}>
        <div className="w-96 bg-red-100 p-7 rounded-2xl">
          <p className="m-0">
            This action is irreversible. Are you sure you want to delete this
            crew member?
          </p>
          <div className="flex justify-end mt-5 gap-10">
            <Button
              variant="outlined"
              type="button"
              isLoading={false}
              onClick={toggleClass}
            >
              No
            </Button>
            <Button
              color="error"
              type="button"
              isLoading={false}
              onClick={deleteCrewMember}
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
