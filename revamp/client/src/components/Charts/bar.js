import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import BackButton from '../backButton/backButton';
import { useLocation } from 'react-router-dom';

const CS = [
  { id: 'Systems Ld', value: 10 },
  { id: 'Afiniti', value: 20 },
  { id: 'JBS', value: 30 },
];

const CE = [
  { id: 'KE', value: 20 },
  { id: 'Arkhitech', value: 40 },
  { id: 'Lakson Business Solutions', value: 65 },
];

const SDP = [
  { id: 'Unilever', value: 15 },
  { id: 'Reckitt', value: 5 },
  { id: 'P&G', value: 12 },
];

const Bar = () => {
  
  const location = useLocation();
  const dataFull = location.state?.dataUpdates;
  console.log(dataFull);
  const [data, setData] = useState(CS);
  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === 'CS') {
      setData(CS);
    } else if (selectedValue === 'CE') {
      setData(CE);
    } else {
      setData(SDP);
    }
  };

  return (
    <>
      <BackButton/>
      <select onChange={handleFilterChange}>
        <option value="CS">CS</option>
        <option value="CE">CE</option>
        <option value="SDP">SDP</option>
      </select>
      <div style={{ height: '500px' }}>
        <ResponsiveBar
          data={data}
          keys={['value']}
          indexBy="id"
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'category10' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Company',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </>
  );
};

export default Bar;
