import React from 'react'
import { CryptoState } from '../context/CryptoContext'

function Header() {

  const {currency,setCurrency}=CryptoState();
  console.log("currency" , currency)

  return (
    <header className='flex justify-between bg-gray-900 py-3 items-center px-6 border-b-3 border-black'>
      <h1 className='text-amber-300 text-3xl font-bold'>
        Crypto hunter
      </h1>
      <select value={currency} onChange={(e)=>{
        console.log(e.target.value)
        setCurrency(e.target.value)
      }} className='text-white border px-4 py-2'>
        <option className='bg-gray-500' value={"INR"}>INR</option>
        <option className='bg-gray-500' value={"USD"}>USD</option>
      </select>
    </header>
  )
}

export default Header
