
import React, { useState, useEffect }  from "react";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../Graphs/flexbetween";
import {useDispatch} from "react-redux";
import {get} from "../../actions/dashboard";
import { useSelector } from "react-redux";
import {Link, useHistory, useLocation} from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// import {Grid} from "@mui/material";
import {
  DownloadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import BreakdownChart from "../Charts/breakdownchart";
import StatBox from "../Charts/statbox";
import { ResponsiveBar } from "@nivo/bar";
import BarChart from "../Charts/barchart";

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState(null);

    useEffect(() => {
        dispatch(get());
    }, []);
  const data1 = useSelector((users) => users);
  const dataUpdates = data1.dash;
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  let students = 0;
  let alumni = 0; 
  let higherStudies = 0;
  let employed = 0;
  for (var key of Object.keys(dataUpdates)) {
    if(parseInt(dataUpdates[key].batch) > 2023) {
      students++;
    }
    else{
      alumni++;
    }
    if(dataUpdates[key].isgradschool){
      higherStudies++;
    }
    if(dataUpdates[key].isemployed){
      employed++;
    }
  }
  
  const data = {
    students: students,
    higherStudies: higherStudies,
   alumni: alumni,
    employed: employed,
    updates: dataUpdates
  }
  
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
  const downloadPDF = () => {
    const input = document.getElementById('root');
  
    html2canvas(input, { 
      allowTaint: true,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY 
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
      });
  };
  

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}

        <Box>
        <Button
  sx={{
    backgroundColor: "#5c2568",
    color: theme.palette.background.alt,
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  }}
  onClick={downloadPDF}
>
  <DownloadOutlined sx={{ mr: "10px" }} />
  Download Reports
</Button>

        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="minmax(160px, auto)"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        
        {/* ROW 1 */}
        <StatBox
          title="Students"
          value={data && data.students}
          gridColumn={{ xs: "span 6", sm: "span 3", md: "span 3" }}
        />
        <StatBox 
          title="Alumni"
          value={data && data.alumni}
          gridColumn={{ xs: "span 6", sm: "span 3", md: "span 3" }}
          gridRow={{ xs: "auto", md: "1 / span 2" }}
        />
        <Box
          gridColumn={{ xs: "span 12", md: "span 6", lg: "span 8" }}
          gridRow={{ xs: "auto", md: "1 / span 2" }}
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"r
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Alumni by location
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between">
            <Typography component={Link} to={{
            pathname: "/bar",
            state: {dataUpdates}
            }} variant="h7" sx={{ color: theme.palette.secondary[100] }}>
              View by company
            </Typography >
            
          </Box>
    
          <BarChart view="sales" isDashboard={true}  majData={data.updates}/>
        </Box>
        <StatBox
          title="Higher Studies"
          value={data && data.higherStudies}
          gridColumn={{ xs: "span 6", sm: "span 3", md: "span 3" }}
          gridRow={{ xs: "auto", md: "1 / span 2" }}
        />
        <StatBox
          title="Employed"
          value={data && data.employed}
          gridColumn={{ xs: "span 6", sm: "span 3", md: "span 3" }}
          gridRow={{ xs: "auto", md: "1 / span 2" }}
        />


        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            New Updates
          </Typography>
          <Typography component={Link} to={{
            pathname: "/custom",
            state: {dataUpdates}
            }} variant="h7" sx={{ color: theme.palette.secondary[100] }}>
              Go to advanced filtering
            </Typography >
          <DataGrid
            // loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.updates) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Alumni by major
          </Typography>
          <Typography component={Link} to={{
            pathname: "/piechart",
            state: {dataUpdates}
            }} variant="h7" sx={{ color: theme.palette.secondary[100] }}>
              View by status
            </Typography>
          <BreakdownChart isDashboard={true} majData={data.updates}/>
        </Box>
      </Box>
    </Box>
  );
};
  
export default Dashboard;
