import React from 'react'
import './style.css'




function PokeDetail({name,image,height}) {
  return (
      <div className='pokeDetail' >
          <h1>{ name.toUpperCase() }</h1>
          <img src={image} alt="" />
          <h2>Height : {height}</h2>
    </div>
  )
}

export default PokeDetail