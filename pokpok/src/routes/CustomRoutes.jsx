import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Pokidex from '../Components/Pokidex/Pokidex'
import PokemonDetails from '../Components/PokemonDetails/PokemonDetails'
const CustomRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Pokidex/>} />
        <Route path='/pokemon/:id' element={<PokemonDetails/>} />
    </Routes>
  )
}

export default CustomRoutes