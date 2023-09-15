import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '../../hooks/useDebounce';
function Search  ({updateSearchTerm}){
  const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value))
  return (
    <>
        <div className='relative'>
        <input className='tracking-wider w-[200px] lg:w-[500px] bg-slate-800 h-10 border-2 border-gray-600 mx-auto my-0 p-4 rounded-2xl ' type="text"
        placeholder='Pokimon Name...'
        onChange={debouncedCallback} />
        <span className='absolute right-4 top-2 cursor-pointer'><SearchIcon/></span>
        </div>
    </>
  )
}

export default Search