import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/CryptoContext'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../config/api'
import { Link } from 'react-router-dom';

function Slider() {
    
     function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const [trending, setTrending] = useState([]);

    const { currency ,currencySymbol} = CryptoState()

    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        }
    }


    const items=trending.map((coin)=>{
        const profit=coin.price_change_percentage_24h>=0;
        return(
        <Link to={`/coin/${coin?.id}`} className='flex flex-col items-center'>
            <img 
            src={coin?.image} 
            alt={coin?.name}
            className='mb-4 h-[80px] w-[80px]'
            />
            <div>
                <span className='text-amber-300'>{coin?.symbol.toUpperCase()} </span>
                <span>{profit&&'+'}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
            </div>
            <h2 className='text-white text-2xl'>{currencySymbol}{formatNumberWithCommas(coin?.current_price)}</h2>
        </Link>
    )})

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency),{
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-Ckha8hfHCujgZvvAneTQuuzF'
              }
        });
        setTrending(data);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    return (
        <div className='text-white w-[80vw]'> 
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls
            />
        </div>
    )
}

export default Slider
