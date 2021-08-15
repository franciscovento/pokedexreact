import '../DetailsPage/detailsPage.css'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import StatsPoke from '../../components/stats/StatsPoke';



const DetailsPage = () => {


const [pokemonDetails, setPokemonDetails] = useState(undefined);
const [stylesType, setStylesType] = useState();
const {pokemon} = useParams()

useEffect(()=>{
  const getInfo = async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = [{
      name: res.data.name,
      img: res.data.sprites.other.dream_world.front_default,
      stats: res.data.stats,
      height: res.data.height,
      weight: res.data.weight,
      types: res.data.types,
      id: res.data.id
    }]
  setPokemonDetails(data);
  
};
getInfo();
},[pokemon])

useEffect(()=>{
if (pokemonDetails) {
  let styles = `detailsPageContainer ${pokemonDetails[0].types[0].type.name}`;
  setStylesType(styles);
}

},[pokemonDetails])


  return (
    <div className={stylesType}>
     {pokemonDetails? 
   <div className='infoContainer'>
     <div className='idNamestats'>
       <p>#{pokemonDetails[0].id}</p>
       <h4>{pokemonDetails[0].name}</h4>
     </div>
     <div className='left'>
       <p>Height: {pokemonDetails[0].height} m</p>
       <p>Weigth: {pokemonDetails[0].weight}</p>
     </div>
     <div className='center'>
       <img src={pokemonDetails[0].img} alt="" />
     </div>
     
     <div className='right'>
     <h2>BASE STATS</h2>
     {pokemonDetails[0].stats.map((x, index) => <StatsPoke title={x.stat.name} content={x.base_stat} key={index}/>)}
     </div> 
     <div className='typeStats'>
       <p>Types → {pokemonDetails[0].types.map((x,index)=> <span key={index}>{index + 1}: {x.type.name} </span> )}</p>
     </div>
     <Link to='/search'><button>Volver</button></Link>
     

   </div>
     : 
     <div className='menssageError'>
        Cargando información...
          <Link to='/search'><button>Volver</button></Link>
     </div>
     }
    
    </div>
  )
}

export default DetailsPage

 //  <div className='sidesContainer'>
    //    <div className='leftSide'>
        
    //    </div>
    //    <div className='centerSide'>
    //    <h1>{pokemonDetails[0].name}</h1>
    //     <img src={pokemonDetails[0].img} alt="" />
    //    </div>
    //    <div className='rightSide'>
    //    <h2>Base Stats</h2>
    //    <div className='statsContainer'>
    //    {pokemonDetails[0].stats.map((x, index) => <StatsPoke title={x.stat.name} content={x.base_stat} key={index}/>)}
    //    </div>
    //    </div>      
    //  </div>