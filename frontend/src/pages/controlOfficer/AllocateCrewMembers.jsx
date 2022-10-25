import ControlOfficerLayout from '../../layout/ControlOfficerLayout';
import React, { useState, useEffect } from 'react';
import AlloCrewMemCard from '../../components/AllocateCrewMemberCard';
import TextField from '../../components/TextField';
import request from '../../utils/request';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// @ts-ignore
import { DatePicker } from '@mui/x-date-pickers';
// @ts-ignore
import { LocalizationProvider } from '@mui/x-date-pickers';
import SearchBar from 'components/SearchBar';
import { CircularProgress } from '@mui/material';

let trainDetailsArr = [];
export default function AllocateCrewMembers() {
  const [valueT, setValueT] = useState(null);
  // const [value, setValue] = useState('');
  const [turnDetails, setTurnDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getScheduleDetails();
  }, []);

  async function getScheduleDetails() {
    try {
      const res = await request(
        'get',
        '/control-officer/train-schedule-details',
        {}
      );
      setIsLoading(false);
      trainDetailsArr = res.data;
      setTurnDetails(res.data);
      console.log(res.data);
    } catch (e) {
      console.error('Get train turn list error:', e);
    }
  }

  const searchByTNumber = (event) => {
    console.log(event.target.value);
    console.log(event.target.value);
    // setValue(event.target.value);
    setTurnDetails((preTrainDetails) => {
      const filteredData = trainDetailsArr.filter((turnDetails) =>
        turnDetails.turnNumber.toString().includes(event.target.value)
      );

      console.log('filtered:', trainDetailsArr);
      return filteredData;
    });
  };

  const searchByDate = (val) => {
    // setValue(event.target.value);
    console.log('searcisdf');
    const todayUTC = new Date(new Date(val).toDateString());
    const todaySL = new Date(todayUTC);
    todaySL.setHours(todayUTC.getHours() + 5);
    todaySL.setMinutes(todayUTC.getMinutes() + 30);
    // const date = moment(event.target.value).format('DD MM YYYY');
    setTurnDetails((preTrainDetails) => {
      return trainDetailsArr.filter(
        (turnDetails) =>
          new Date(turnDetails.date).toDateString() === todaySL.toDateString()
      );
    });
  };

  function crewMemberCard() {
    return (
      <div>
        {turnDetails.map((turn) => (
          <AlloCrewMemCard
            key={turn.turnNumber + ' ' + turn.date}
            TName={turn.trainTurn.turnName}
            TNumber={turn.turnNumber}
            Date={turn.date}
            Driver={
              turn.driver
                ? turn.driver.firstName + ' ' + turn.driver?.lastName
                : 'Not Assigned'
            }
            AssiDriver={
              turn.driverAssistant
                ? turn.driverAssistant.firstName +
                  ' ' +
                  turn.driverAssistant?.lastName
                : 'Not Assigned'
            }
            HeadGuard={
              turn.headGuard
                ? turn.headGuard.firstName + ' ' + turn.headGuard?.lastName
                : 'Not Assigned'
            }
            UnderGuard={
              turn.underGuard
                ? turn.underGuard.firstName + ' ' + turn.underGuard?.lastName
                : 'Not Assigned'
            }
            ScheduleId={turn.trainScheduleId}
          />
        ))}
      </div>
    );
  }
  return (
    <ControlOfficerLayout>
      <h1>Allocate Crew Members</h1>
      <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
        <SearchBar
          id="searchTurn"
          name="searchTurn"
          className="w-60"
          label="Turn Number"
          onChange={searchByTNumber}
          handleSearch={searchByTNumber}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            className="w-60 border-r-slate-600"
            value={valueT}
            onChange={(newValue) => {
              setValueT(newValue);
              searchByDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} error={false} />}
          />
        </LocalizationProvider>
      </div>

      <div className="flex justify-center w-full">
        {isLoading ? (
          <CircularProgress className="mt-5 text-slate-500" />
        ) : (
          crewMemberCard()
        )}
      </div>
    </ControlOfficerLayout>
  );
}
