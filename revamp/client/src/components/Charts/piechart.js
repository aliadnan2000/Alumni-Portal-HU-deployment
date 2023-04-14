import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import BackButton from '../backButton/backButton';
import { useLocation } from 'react-router-dom';

let employedCS = 0, unemployedCS = 0, studiesCS = 0;
  let employedCH = 0, unemployedCH = 0, studiesCH = 0;
  let employedCE = 0, unemployedCE = 0, studiesCE = 0;
  let employedEE = 0, unemployedEE = 0, studiesEE = 0;
  let employedCND = 0, unemployedCND = 0, studiesCND = 0;
  let employedSDP = 0, unemployedSDP = 0, studiesSDP = 0;

  const CS = [
    { id: 'Employed', value: 0 },
    { id: 'Unemployed', value: unemployedCS },
    { id: 'Higher Studies', value: studiesCS },
  ];
  
  const CE = [
    { id: 'Employed', value: employedCE },
    { id: 'Unemployed', value: unemployedCE },
    { id: 'Higher Studies', value: studiesCE },
  ];
  
  const EE = [
    { id: 'Employed', value: employedEE },
    { id: 'Unemployed', value: unemployedEE },
    { id: 'Higher Studies', value: studiesEE },
  ];
  
  const CH = [
    { id: 'Employed', value: employedCH },
    { id: 'Unemployed', value: unemployedCH },
    { id: 'Higher Studies', value: studiesCH },
  ];
  
  const CND = [
    { id: 'Employed', value: employedCND },
    { id: 'Unemployed', value: unemployedCND },
    { id: 'Higher Studies', value: studiesCND },
  ];
  
  const SDP = [
    { id: 'Employed', value: employedSDP },
    { id: 'Unemployed', value: unemployedSDP },
    { id: 'Higher Studies', value: studiesSDP },
  ];

const PieChart = () => {
  
  const location = useLocation();
  const dataFull = location.state?.dataUpdates;
  
  const [data, setData] = useState(CS);

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === 'CS') {
      setData(CS);
    } else if (selectedValue === 'CE') {
      setData(CE);
    } else if (selectedValue === 'EE') {
      setData(EE);
    }
    else if (selectedValue === 'CH') {
      setData(CH);
    }
    else if (selectedValue === 'SDP') {
      setData(SDP);
    }
    else if (selectedValue === 'CND') {
      setData(CND);
    }
  
  };
  for (var key of Object.keys(dataFull)) {
    if(parseInt(dataFull[key].batch) <= 2023) {
      if(dataFull[key].major == "CS"){
        if(dataFull[key].isgradschool){
          CS[2].value++;
        }
        if(dataFull[key].isemployed){
          CS[0].value++;
        }
        else{
          CS[1].value++;
        }
      }
      else if(dataFull[key].major == "CH"){
        if(dataFull[key].isgradschool){
          CH[2].value++
        }
        if(dataFull[key].isemployed){
          CH[0].value++
        }
        else{
          CH[1].value++
        }
      }
      else if(dataFull[key].major == "CE"){
        if(dataFull[key].isgradschool){
          CE[2].value++
        }
        if(dataFull[key].isemployed){
          CE[0].value++
        }
        else{
          CE[1].value++
        }
      }
      else if(dataFull[key].major == "EE"){
        if(dataFull[key].isgradschool){
          EE[2].value++
        }
        if(dataFull[key].isemployed){
          EE[0].value++
        }
        else{
          EE[1].value++
        }
      }
      else if(dataFull[key].major == "CND"){
        if(dataFull[key].isgradschool){
          CND[2].value++
        }
        if(dataFull[key].isemployed){
          CND[0].value++
        }
        else{
          CND[1].value++
        }
      }
      else if(dataFull[key].major == "SDP"){
        if(dataFull[key].isgradschool){
          SDP[2].value++
        }
        if(dataFull[key].isemployed){
          SDP[0].value++
        }
        else{
          SDP[1].value++
        }
      }
    }
  }

 


  return (
    <>
    <BackButton/>
      <select onChange={handleFilterChange}>
        <option value="CS">CS</option>
        <option value="CE">CE</option>
        <option value="EE">EE</option>
        <option value="CH">CH</option>
        <option value="CND">CND</option>
        <option value="SDP">SDP</option>
      </select>
      <div style={{ height: '500px' }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'category10' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  );
};

export default PieChart;
