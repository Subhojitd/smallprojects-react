import { useCallback, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(false)
  const [numAllowed, setnumAllowed] = useState(false)
  const [spclCharAllowed, setSpclCharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed){
      str += "0123456789"
    }
    if(spclCharAllowed){
        str += "!@#$%^&*()+=_[]{}~`"
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1 )

      pass = str.charAt(char)
      
    }
    setpassword(pass)

  },[length,numAllowed,spclCharAllowed,setpassword])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className=' text-center text-white pb-1'>Password Generator</h1>
      <div className=' flex shadow-md rounded-lg overflow-hidden mb-4'>
        <input value={password} placeholder='password' readOnly className='outline-none w-full  py-1 px-3' type="text" />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2.5'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className=' cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
          <label>Length: {length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllowed} className=' cursor-pointer' onChange={()=>{setnumAllowed((prev)=> !prev)}}/>
          <label>Numbers </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numAllowed} className=' cursor-pointer' onChange={()=>{setSpclCharAllowed((prev)=> !prev)}}/>
          <label>Special Character </label>
        </div>
      </div>
    </div>
  )
}

export default App
