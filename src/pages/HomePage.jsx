import React, { useEffect, useState } from 'react'
import BannerSection from '../components/BannerSection'
import CoinsTable from '../components/CoinsTable'
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoState } from '../context/CryptoContext';

function HomePage() {

  

  return (
    <div className='flex flex-col items-center w-screen'>
      <BannerSection/>
      <CoinsTable/>
    </div>
  )
}

export default HomePage
