import React from 'react'
import { FaPen, FaRegCircle,FaTimes } from 'react-icons/fa'
const Icons = ({name}) => {
  if (name == "cross"){
    return <FaTimes/>
  }else if (name == "circle"){
    return <FaRegCircle/>
  }else{
    return <FaPen/>
  }
}

export default Icons