import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from "../context/CryptoContext"
import axios from "axios"
import { SingleCoin } from '../config/api'
import CoinInfo from '../components/CoinInfo'
import parse from 'html-react-parser';



function CoinPage() {

  const { id } = useParams();

  const [coin, setCoin] = useState();

  const { currency, currencySymbol } = CryptoState();



  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id), {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-Ckha8hfHCujgZvvAneTQuuzF'
      }
    });
    setCoin(data)
  }
  function formatNumberWithCommas(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  useEffect(() => {
    fetchCoin();
  }, []);

  return (
    <div className='bg-gray-900 text-white flex-1 flex flex-col lg:flex-row items-center justify-center'>
      <div className='lg:w-[30%] w-full p-6 flex flex-col justify-center items-center gap-4 border-r-2 '>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          className='h-[200px]'
        />
        <h1 className='text-4xl font-semibold text-white'>{coin?.name}</h1>
        <p className='text-white text-justify text-[18px]  leading-6 '> {parse(coin?.description.en.split(".")[0])[0]}.</p>
        <div className=' w-full'>
          <div>Rank : <span>{coin?.market_cap_rank}</span></div>
          <div>Current Price : <span>{currencySymbol}{" "}{formatNumberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</span></div>
          <div>Market Cap : <span>{currencySymbol}{" "}
              {formatNumberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M</span></div>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage
