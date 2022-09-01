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
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import TextField from 'components/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { Close } from '@mui/icons-material';
import { useCallback } from 'react';

export default function ProfileUser() {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = useParams().id;
  const [isActive, setActive] = useState(false);
  const [blockReason, setBlockReason] = useState();
  const [blockingReason, setBlockingReason] = useState('');
  const [blockError, setBlockError] = useState('');
  const [blockSuccess, setBlockSuccess] = useState(false);
  const [unblockError, setUnblockError] = useState('');
  const [unblockSuccess, setUnblockSuccess] = useState(false);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await request('get', `/admin/user/profile/${userId}`, {});
      setUserDetails(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get user details error:', e);
    }
  }, [userId]);

  const getReasonToBlock = useCallback(async () => {
    try {
      const res = await request(
        'get',
        `/admin/user/block/reason/${userId}`,
        {}
      );
      setBlockReason(res.data);
    } catch (e) {
      console.error('Get reason to block user error:', e);
    }
  }, [userId]);

  useEffect(() => {
    getProfile();
    getReasonToBlock();
  }, [getProfile, getReasonToBlock]);

  const toggleClass = () => {
    setActive(!isActive);
  };

  async function blockUser() {
    console.log(userId);
    console.log(blockingReason);
    try {
      await request('put', `/admin/user/block/${userId}`, {});
      await request('post', `/admin/user/block/reason/${userId}`, {
        userId: userId,
        reason: blockingReason,
      });
      setBlockSuccess(true);
      getProfile();
      getReasonToBlock();
      toggleClass();
    } catch (e) {
      if (e?.response?.status === 500) {
        setBlockError('Error blocking user');
        console.error('Block user error:', e);
      } else {
        console.log(e?.response?.data);
        setBlockError(e?.response?.data?.errors[0]);
      }
    }
  }

  async function unblockUser() {
    try {
      await request('put', `/admin/user/unblock/${userId}`, {});
      await request('delete', `/admin/user/block/reason/${userId}`, {});
      setUnblockSuccess(true);
      getProfile();
    } catch (e) {
      if (e?.response?.status === 500) {
        setUnblockError('Error unblocking user');
        console.error('Unblock user error:', e);
      } else {
        console.log(e?.response?.data);
        setUnblockError(e?.response?.data?.errors[0]);
      }
    }
  }

  function setUserRole(role) {
    switch (role) {
      case 'CONTROL_OFFICER':
        return 'Control Officer';
      case 'TICKETING_OFFICER':
        return 'Ticketing Officer';
      case 'TICKET_CHECKER':
        return 'Ticket Checker';
      case 'PASSENGER':
        return 'Passenger';
      default:
        return;
    }
  }

  function detailTable(user, reason) {
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
          <h2 className="m-0 mt-1 font-light">{setUserRole(user?.role)}</h2>
        </div>
        <div className="w-2/3">
          <Table>
            <TableRow>
              <TableCell className="font-medium">Id</TableCell>
              <TableCell>{user?.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell>{user?.email}</TableCell>
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
              <TableCell className="font-medium">Status</TableCell>
              <TableCell>{user?.status}</TableCell>
            </TableRow>
            {user?.stationId === null ? (
              <TableRow className="hidden">
                <TableCell className="font-medium">Station</TableCell>
                <TableCell>{user?.stationId}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell className="font-medium">Station</TableCell>
                <TableCell>
                  {user?.station.name} - {user?.stationId}
                </TableCell>
              </TableRow>
            )}
            {user?.status === 'ACTIVE' ? (
              <TableRow className="hidden">
                <TableCell className="font-medium">Reason to block</TableCell>
                <TableCell>{reason?.reason}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell className="font-medium">Reason to block</TableCell>
                <TableCell>{reason?.reason}</TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mt-0">Profile</h1>

      <div className="mb-4">
        <Collapse in={Boolean(blockError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setBlockError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Error blocking user
          </Alert>
        </Collapse>

        <Collapse in={Boolean(blockSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setBlockSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            User blocked successfully.
          </Alert>
        </Collapse>

        <Collapse in={Boolean(unblockError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUnblockError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            Error unblocking user
          </Alert>
        </Collapse>

        <Collapse in={Boolean(unblockSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUnblockSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            User unblocked successfully.
          </Alert>
        </Collapse>
      </div>

      {isLoading ? (
        <div className="flex justify-center w-full">
          <CircularProgress className="mt-5 text-slate-500" />
        </div>
      ) : (
        detailTable(userDetails, blockReason)
      )}

      <div className="flex justify-center w-full mt-10">
        {
          // @ts-ignore
          userDetails?.status === 'ACTIVE' ? (
            <Button
              type="button"
              isLoading={false}
              onClick={toggleClass}
              className={isActive ? 'hidden' : 'block'}
              variant="outlined"
              color="error"
            >
              Block User
            </Button>
          ) : (
            <Button
              type="button"
              isLoading={false}
              onClick={unblockUser}
              className={isActive ? 'hidden' : 'block'}
            >
              Unblock User
            </Button>
          )
        }
      </div>

      <div className={isActive ? 'flex justify-center' : 'hidden'}>
        <div className="w-96 bg-red-100 p-7 rounded-2xl">
          <div className="flex flex-row justify-between">
            <h2 className="m-0 mb-5 font-light">Reason to block</h2>
            <IconButton
              className="h-10 w-10 text-slate-600 hover:bg-slate-400 m-0
                      "
              onClick={toggleClass}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </div>
          <TextField
            required
            multiline
            minRows={3}
            fullWidth
            id="blockingReason"
            name="blockingReason"
            onChange={(event) => setBlockingReason(event.currentTarget.value)}
            value={blockingReason}
          />
          <div className="flex justify-end gap-10 mt-5">
            <Button
              type="button"
              isLoading={false}
              onClick={blockUser}
              color="error"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
