import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PokeDetail from './PokeDetail'
import Pokemon from './Pokemon'

const Home = () => {
    const [data, setData] = useState([])
    const [info, setInfo] = useState([]) 

    const [pokeData,setPokeData] = useState([])

    const [next,setNext] = useState(0)

    const [loading,setLoading] = useState(true)

    const getData = async () => {
        let arr = []
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?' + `offset=${next}&limit=20`)
        setData(res.data.results)
        for (const link of res.data.results) {
            try {
                const response = await axios.get(link.url)
                arr.push(response.data)

                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        setInfo(arr)
    }

    useEffect(() => {
        getData()
    },[next])


    const handleSort = () => {
        const arr = [...info]

        arr.sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })

        setInfo(arr)



    }

    const handleNext = () => {
        setNext(next + 20)
    }

    const handlePrevious = () => {
        if (next > 0) {
            setNext(next - 20)
        }
    }

    const setPokemon = id => {
        console.log(id);
        setPokeData(info.filter(d => d.id == id))
        console.log(pokeData);
    }

    return (
        <>
            <h1>Pokemons</h1>
            <button className='btn' onClick={handleSort} >sort</button>
            {next>0 && <button className='btn' onClick={handlePrevious} >previous</button>}
                            <button className='btn' onClick={handleNext} >Next</button>

            <div className="box">

                <div className="left">
                        
                            {!loading ? info.map(item => <Pokemon onLoad={setPokemon} data = {item} />  ) : 'loading'
                        }
                </div>

                <div className="right">
                    {pokeData.length != 0 ?
                        <PokeDetail
                            name={pokeData[0].name}
                            image = {pokeData[0].sprites.front_default}
                            height = {pokeData[0].height}
                    /> : 'click'}
                </div>

            </div>

            
      </>
    )
}

export default Home
