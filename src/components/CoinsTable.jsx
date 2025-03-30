import React, { useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  yellow } from '@mui/material/colors';
import { CryptoState } from '../context/CryptoContext';
import { CoinList } from '../config/api';
import axios from 'axios';
import { createTheme, Pagination, TextField, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";

function CoinsTable() {

    const [coins, setCoins] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [search, setSearch] = useState('');

    const { currency, currencySymbol } = CryptoState();

    const [page, setPage] = useState(1)

    console.log(search)

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const navigate = useNavigate()

    const fetchAllCoins = async () => {
        setIsLoading(true);
        const { data } = await axios.get(CoinList(currency), {
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-Ckha8hfHCujgZvvAneTQuuzF'
            }
        });
        setCoins(data);
        setIsLoading(false);
    }

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleSearch = () => {
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }
    useEffect(() => {
        fetchAllCoins();
    }, [currency])

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='w-full bg-black flex justify-center'>
                <div className='w-[80vw] bg-black flex flex-col  justify-center items-center align-middle' >
                    <h1 className='text-white text-4xl mb-5'>Cryptocurrency Prices by Market Cap </h1>
                    <TextField
                        className='text-white w-full'
                        style={{marginBottom:"10px"}}
                        sx={{
                            input: { color: "white" }, 
                            label: { color: "white" }, 
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "white" }, 
                              "&:hover fieldset": { borderColor: "white" }, 
                              "&.Mui-focused fieldset": { borderColor: "white" }, 
                            },
                          }}
                        
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search For a Crypto Currency.."
                        variant="outlined"
                    />
                    {
                        isLoading ? <Audio
                            height="50"
                            width="80"
                            radius="9"
                            color="yellow"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        /> : <><TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) =>
                                            <TableCell
                                                style={
                                                    {
                                                        fontWeight: 700,
                                                        backgroundColor: yellow[700],
                                                    }
                                                }
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                            const profit = row.price_change_percentage_24h > 0
                                            return (
                                                <TableRow
                                                    key={row.name}
                                                    onClick={() => navigate(`/coin/${row.id}`)}
                                                    className='hover:bg-gray-900'
                                                >
                                                    <TableCell
                                                        component={'th'}
                                                        scope='row'
                                                        style={{ display: "flex", gap: 15 }}>
                                                        <img src={row?.image} alt={row?.name} className='h-[50px] w-[50px]' />
                                                        <div className='text-white flex flex-col' >
                                                            <span className='font-semibold text-2xl'>{row.symbol.toUpperCase()}</span>
                                                            <span>{row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='right' style={{ color: 'white' }}>
                                                        {currencySymbol}
                                                        {formatNumberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell align='right' style={{ color: profit > 0 ? 'rgb(14,203,129)' : "red" }}>
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align='right' style={{ color: "white" }}>
                                                        {currencySymbol}
                                                        {formatNumberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                            <Pagination
                            className='mt-5'
                                sx={{
                                    "& .MuiPaginationItem-root": { color: "white" },
                                  }}
                                count={Math.ceil(handleSearch()?.length / 10)}
                                onChange={(_, value) => {
                                    setPage(value);
                                    window.scroll(0, 450);
                                  }}
                            />

                        </>
                    }
                </div>
            </div>
        </ThemeProvider>
    )
}

export default CoinsTable
