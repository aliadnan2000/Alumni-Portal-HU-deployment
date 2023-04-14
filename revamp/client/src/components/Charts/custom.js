import React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Grid, Select, MenuItem } from "@mui/material";
import { useLocation } from 'react-router-dom';
import BackButton from '../backButton/backButton';

const columns = [
  {
    field: "huID",
    headerName: "Habib ID",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.75,
  },
  {
    field: "employment",
    headerName: "Works At",
    flex: 0.75,
  },
  {
    field: "gradschool",
    headerName: "Studies At",
    flex: 0.75,
  },
  {
    field: "batch",
    headerName: "Batch",
    flex: 0.5,
  },
  {
    field: "major",
    headerName: "Major",
    flex: 1,
  },
];


export default function StudentList() {
    const location = useLocation();
  const rows = location.state?.dataUpdates;
  const [huIDFilter, setHuIDFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const [employmentFilter, setEmploymentFilter] = useState(null);
  const [gradschoolFilter, setGradschoolFilter] = useState(null);
  const [batchFilter, setBatchFilter] = useState(null);
  const [majorFilter, setMajorFilter] = useState(null);

  const huIDOptions = [...new Set(rows.map((row) => row.huID))];
  const nameOptions = [...new Set(rows.map((row) => row.name))];
  const employmentOptions = [...new Set(rows.map((row) => row.employment))];
  const gradschoolOptions = [...new Set(rows.map((row) => row.gradschool))];
  const batchOptions = [...new Set(rows.map((row) => row.batch))];
  const majorOptions = [...new Set(rows.map((row) => row.major))];

  const filteredRows = rows
    .filter((row) => !huIDFilter || row.huID === huIDFilter)
    .filter((row) => !nameFilter || row.name === nameFilter)
    .filter((row) => !employmentFilter || row.employment === employmentFilter)
    .filter((row) => !gradschoolFilter || row.gradschool === gradschoolFilter)
    .filter((row) => !batchFilter || row.batch === batchFilter)
    .filter((row) => !majorFilter || row.major === majorFilter);

  return (
    <>
    <BackButton/>
    <Typography variant="h1">Student List</Typography>
      <Grid container spacing={2}>
      <Grid item xs={2}>
      <div>
        <label htmlFor="huIDFilter">Habib ID:</label>
        <Select
          id="huIDFilter"
          value={huIDFilter}
          onChange={(event) => setHuIDFilter(event.target.value)}
        >
          <MenuItem value={null}>All</MenuItem>
          {huIDOptions.map((huID) => (
        <MenuItem key={huID} value={huID}>
          {huID}
        </MenuItem>
      ))}
    </Select>
    </div>
        </Grid>

<Grid item xs={2}>       
  <div>
    <label htmlFor="nameFilter">Name:</label>
    <Select
      id="nameFilter"
      value={nameFilter}
      onChange={(event) => setNameFilter(event.target.value)}
    >
      <MenuItem value={null}>All</MenuItem>
      {nameOptions.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </div>
</Grid>

<Grid item xs={2}>
  <div>
    <label htmlFor="employmentFilter">Works At:</label>
    <Select
      id="employmentFilter"
      value={employmentFilter}
      onChange={(event) => setEmploymentFilter(event.target.value)}
    >
      <MenuItem value={null}>All</MenuItem>
      {employmentOptions.map((employment) => (
        <MenuItem key={employment} value={employment}>
          {employment}
        </MenuItem>
      ))}
    </Select>
  </div>
  </Grid>

<Grid item xs={2}>
  <div>
    <label htmlFor="gradschoolFilter">Studies At:</label>
    <Select
      id="gradschoolFilter"
      value={gradschoolFilter}
      onChange={(event) => setGradschoolFilter(event.target.value)}
    >
      <MenuItem value={null}>All</MenuItem>
      {gradschoolOptions.map((gradschool) => (
        <MenuItem key={gradschool} value={gradschool}>
          {gradschool}
        </MenuItem>
      ))}
    </Select>
  </div>
  </Grid>

  <Grid item xs={2}>
  <div>
    <label htmlFor="batchFilter">Batch:</label>
    <Select
      id="batchFilter"
      value={batchFilter}
      onChange={(event) => setBatchFilter(event.target.value)}
    >
      <MenuItem value={null}>All</MenuItem>
      {batchOptions.map((batch) => (
        <MenuItem key={batch} value={batch}>
          {batch}
        </MenuItem>
      ))}
    </Select>
  </div>
  </Grid>

  <Grid item xs={2}>
  <div>
    <label htmlFor="majorFilter">Major:</label>
    <Select
      id="majorFilter"
      value={majorFilter}
      onChange={(event) => setMajorFilter(event.target.value)}
    >
      <MenuItem value={null}>All</MenuItem>
      {majorOptions.map((major) => (
        <MenuItem key={major} value={major}>
          {major}
        </MenuItem>
      ))}
    </Select>
  </div>
  </Grid>
  </Grid>

  <div style={{ height: 400, width: "100%" }}>
    <DataGrid getRowId={(row) => row._id} 
    autoHeight
    
    rows={filteredRows} 
    columns={columns} />
  </div>
</>
);
}
