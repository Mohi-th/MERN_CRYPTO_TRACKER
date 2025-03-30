import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress } from '@mui/material';
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import {chartDays} from "../config/data"
import SelectButton from './SelectButton';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function CoinInfo({coin}) {

  const [historicalData,setHistoricalData]=useState();
  const [days,setDays]=useState(1);
  const {currency}=CryptoState();

  console.log(historicalData,"id")

  const fetchHistoricalData=async()=>{
    const {data}=await axios.get(HistoricalChart(coin?.id, days, currency), {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-Ckha8hfHCujgZvvAneTQuuzF'
      }
    })
    setHistoricalData(data?.prices)
  }

  useEffect(()=>{
    if(coin)fetchHistoricalData();
  },[currency,days,coin])

  return (
    <div  className='flex-1 p-4 w-full flex flex-col items-center'>
      {
        !historicalData?(
          <CircularProgress
          style={{color:"gold"}}
          size={250}
          thickness={1}
          />
        ):(
          <>
             <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className='flex gap-10 justify-center mt-5 cursor-pointer'>
              {chartDays.map((day)=>(
                <SelectButton 
                key={day.value}
                onClick={()=>{
                  setDays(day.value)
                }}
                selected={day.value===days}
                >{day.label}</SelectButton>
              ))}
            </div>
          </>
        )
      }
    </div>
  )
}

export default CoinInfo
