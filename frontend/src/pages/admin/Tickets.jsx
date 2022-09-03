import React, { useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@mui/icons-material/Upload';
import Button from 'components/Button';
import { postFormData } from 'utils/request';
import { Alert, Collapse, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function Tickets() {
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
    noClick: true,
    noKeyboard: true,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li
      key={
        // @ts-ignore
        file.path
      }
    >
      {
        // @ts-ignore
        file.path
      }{' '}
      - {file.size} bytes
    </li>
  ));

  async function handleSubmit(e) {
    setIsSubmitting(true);
    e.preventDefault();
    console.log(acceptedFiles[0].name);
    setUploadError('');
    setUploadSuccess(false);
    try {
      if (
        acceptedFiles[0].name === 'NORMAL-SECOND_CLASS.csv' ||
        acceptedFiles[0].name === 'NORMAL-THIRD_CLASS.csv' ||
        acceptedFiles[0].name === 'RESERVE-FIRST_CLASS.csv' ||
        acceptedFiles[0].name === 'RESERVE-SECOND_CLASS.csv' ||
        acceptedFiles[0].name === 'RESERVE-THIRD_CLASS.csv' ||
        acceptedFiles[0].name === 'SEASON-SECOND-CLASS.csv' ||
        acceptedFiles[0].name === 'SEASON-THIRD_CLASS.csv'
      ) {
        var formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        postFormData('/admin/addPriceList', formData);
        setUploadSuccess(true);
      } else {
        setUploadError('File name format is incorrect');
      }
    } catch (e) {
      if (e?.response?.status === 500) {
        setUploadError('Error uploading file');
        console.error('Uploading Error: ', e);
      } else {
        console.log(e?.response?.data);
        setUploadError(e?.response?.data?.errors[0]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-4">
        <Collapse in={Boolean(uploadError)}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUploadError(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {uploadError}
          </Alert>
        </Collapse>

        <Collapse in={Boolean(uploadSuccess)}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setUploadSuccess(null);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            File uploaded successfully.
          </Alert>
        </Collapse>
      </div>
      <div className="rounded-2xl shadow-md bg-slate-200 grid gap-4 grid-cols-7">
        <div
          {...getRootProps({
            className:
              'border-dotted border-slate-400 rounded-xl m-4 col-start-1 col-end-5 flex flex-col items-center',
          })}
        >
          <UploadIcon className="text-slate-700 text-6xl" />
          <p>Drag and drop the .csv file here</p>
          <p>The file name should be in the format, 'TICKET TYPE-CLASS.csv'</p>
          <p>E.g. NORMAL-THIRD_CLASS.csv</p>
          <Button type="button" onClick={open}>
            Browse
          </Button>
          <aside>
            <ul>{acceptedFileItems}</ul>
          </aside>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input {...getInputProps()} name="file" />
            <Button
              className="mt-3"
              type="submit"
              value="Upload"
              isLoading={isSubmitting}
            >
              Upload
            </Button>
          </form>
        </div>
        <div className="m-4 col-start-5 col-end-8">
          <h3>Uploaded files</h3>
        </div>
      </div>
    </AdminLayout>
  );
}
