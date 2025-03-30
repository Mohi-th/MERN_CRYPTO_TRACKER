import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";


const Crypto = createContext({

})

const CryptoContext = ({ children }) => {

    const [currency,setCurrency]=useState("INR");
    const [currencySymbol,setCurrencySymbol]=useState("₹")

    useEffect(()=>{
        if(currency==='INR')setCurrencySymbol("₹")
        else if(currency==='USD')setCurrencySymbol("$")
    },[currency])


    return (
        <Crypto.Provider value={{currency,setCurrency,
            currencySymbol,setCurrencySymbol
        }}>
            {children}
        </Crypto.Provider>
    )
}


export const CryptoState=()=>{
    return useContext(Crypto);
}


export default CryptoContext