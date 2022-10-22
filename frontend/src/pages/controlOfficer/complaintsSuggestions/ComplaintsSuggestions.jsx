import ControlOfficerLayout from '../../../layout/ControlOfficerLayout';
import React, { useEffect, useState } from 'react';
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
// import { useCallback } from 'react';

export default function ComplaintsSuggestions() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComplaintsSuggestions();
  }, []);

  async function getComplaintsSuggestions() {
    try {
      const res = await request(
        'get',
        '/control-officer/complaints-suggestions',
        {}
      );
      setFeedbacks(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get train turn list error:', e);
    }
  }

  function detailTable() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Passenger Name</TableCell>
            <TableCell>Complaint/Suggestion</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow
              key={feedback.complaintId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="hidden">{feedback.complaintId}</TableCell>
              <TableCell>
                <Link
                  color="#065b8d"
                  to={`description/${feedback.complaintId}`}
                  className="no-underline my-0 text-slate-500 hover:underline"
                >
                  {feedback.user.firstName} {feedback.user.lastName}
                </Link>
              </TableCell>
              <TableCell>
                {feedback.isComplaint === true ? 'Complaint' : 'Suggestion'}
              </TableCell>
              <TableCell>
                {feedback?.createdAt[0]}
                {feedback?.createdAt[1]}
                {feedback?.createdAt[2]}
                {feedback?.createdAt[3]}
                {feedback?.createdAt[4]}
                {feedback?.createdAt[5]}
                {feedback?.createdAt[6]}
                {feedback?.createdAt[7]}
                {feedback?.createdAt[8]}
                {feedback?.createdAt[9]}
              </TableCell>
              <TableCell>
                {feedback?.createdAt[11]}
                {feedback?.createdAt[12]}
                {feedback?.createdAt[13]}
                {feedback?.createdAt[14]}
                {feedback?.createdAt[15]}
                {feedback?.createdAt[16]}
                {feedback?.createdAt[17]}
                {feedback?.createdAt[18]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <ControlOfficerLayout>
      <h1 className="mt-0">Complaints and Suggestions</h1>
      <div className="flex justify-center w-full">
        {isLoading ? (
          <CircularProgress className="mt-5 text-slate-500" />
        ) : (
          detailTable()
        )}
      </div>
    </ControlOfficerLayout>
  );
}
