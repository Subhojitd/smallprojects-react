import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import CurrencyImage from './assets/currencyImage.png'
import SwapVertIcon from '@mui/icons-material/SwapVert';


import './App.css'

function App() {
 const [amount, setAmount] = useState(1)
 const [from, setFrom] = useState("usd")
 const [to, setTo] = useState("inr")
 const [convertedAmount, setConvertedAmount] = useState(0)

 const currencyInfo =  useCurrencyInfo(from)

 const options = Object.keys(currencyInfo)

 const swap = ()=>{
  setFrom(to)
  setTo(from)
  setConvertedAmount(amount)
  setAmount(convertedAmount)
 }

 const convert = () =>{
  setConvertedAmount(amount * currencyInfo[to])
}



  return (
    <>
      <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-gray-300"
            
        >
           <div className='bg-gradient-to-r from-blue-200 to-blue-400  shadow-lg w-[70%] h-[80%] flex items-center justify-center'>
           <div className="w-full flex items-center justify-center">
                <div className='w-[60%] p-5 h-[80vh] backdrop-blur-sm bg-white/30 flex items-start justify-center flex-col gap-3  ' >
                <img className='w-64 h-64   '  src={CurrencyImage} alt="" />
                    <h1 className='text-6xl  -mt-6 font-semibold  ' >The Currency Convertor</h1>
                    <h2 className='text-xl'>Where currency conversion meets simplicity .</h2>
                </div>
                <div className="w-[40%]  mt-10  p-5 ">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>setFrom(currency)}
                                onAmountChange={(amount) => setAmount(amount)}
                                selectCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                <SwapVertIcon/>
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency)=>setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 ">
                            Convert  {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
           </div>
        </div>
    </>
  )
}

export default App
