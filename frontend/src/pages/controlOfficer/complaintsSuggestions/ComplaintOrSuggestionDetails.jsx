import ControlOfficerLayout from '../../../layout/ControlOfficerLayout';
import React, { useEffect, useState } from 'react';
import { Table, TableRow, TableCell, CircularProgress } from '@mui/material';
import request from 'utils/request';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

export default function ComplaintOrSuggestion() {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const feedbackId = useParams().id;

  const getComplaintOrSuggestionDetails = useCallback(async () => {
    try {
      const res = await request(
        'get',
        `/control-officer/complaints-suggestions/${feedbackId}`,
        {}
      );
      setFeedback(res.data);
      setIsLoading(false);
    } catch (e) {
      console.error('Get feedback error:', e);
    }
  }, [feedbackId]);

  useEffect(() => {
    getComplaintOrSuggestionDetails();
  }, [getComplaintOrSuggestionDetails]);

  function detailTable(feedback) {
    return (
      <Table>
        <TableRow>
          <TableCell className="font-medium">Feedback Id</TableCell>
          <TableCell>{feedback?.complaintId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Passenger Name</TableCell>
          <TableCell>
            {feedback?.user.firstName} {feedback?.user.lastName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Complaint/Suggestion</TableCell>
          <TableCell>
            {feedback?.isComplaint === true ? 'Complaint' : 'Suggestion'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Date</TableCell>
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
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Time</TableCell>
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
        <TableRow>
          <TableCell className="font-medium">Title</TableCell>
          <TableCell>{feedback?.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Description</TableCell>
          <TableCell>{feedback?.description}</TableCell>
        </TableRow>
      </Table>
    );
  }

  return (
    <ControlOfficerLayout>
      <h1 className="mt-0">Complaint/Suggestion Description</h1>
      {isLoading ? (
        <div className="flex justify-center w-full">
          <CircularProgress className="mt-5 text-slate-500" />
        </div>
      ) : (
        detailTable(feedback)
      )}
    </ControlOfficerLayout>
  );
}
