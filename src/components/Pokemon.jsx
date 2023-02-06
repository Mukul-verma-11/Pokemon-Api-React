import React from 'react'
import './style.css'

function Pokemon({ data,onLoad }) {

  const sendId = () => {
    onLoad(data.id)
  }

  return (
    <>
      <div onClick={sendId}  className="card">
      <h1>{data.name.toUpperCase()}</h1>
        <img src={data.sprites.front_default} alt="" />
      </div>
    </>
    
  )
}

export default Pokemon