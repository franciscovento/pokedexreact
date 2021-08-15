import '../SearchPage/searchPage.css'
import { useEffect, useState } from 'react'
import getInfo from '../../services/getInfo'
import CardPokemon from '../../components/cardPokemon/CardPokemon';
import Pagination from '../../components/pagination/Pagination';
import axios from 'axios'
import FormSearcher from '../../components/formSearcher/FormSearcher';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailsPage from '../DetailsPage/DetailsPage';

const SearchPage = ({user, logout}) => {

const {path} = useRouteMatch();



const [pokedata, setPokeData] = useState([]);
const [currentPage, setCurrentPage] = useState("https://pokeapi.co/api/v2/pokemon");
const [nextPage, setNextPage] = useState();
const [prevPage, setPrevPage] = useState();
const [loading, setLoading] = useState(true);
const [allPokemon, setAllPokemon] = useState([]);
const [typeSelected, setTypeSelected] = useState(null);
const [offset, setOffset] = useState(0);
const [prevButton, setPrevBUtton] = useState(null);
const [nextButton, setNextButtton] = useState(null);
const [range, setRange] = useState(null);



useEffect(()=>{
setLoading(true)
const miFunc = async () =>{
const data = await getInfo(currentPage)
setPokeData(data.results);
setNextPage(data.next);
setPrevPage(data.previous);
setLoading(false);
}
miFunc();
},[currentPage])


useEffect(()=>{
  if (pokedata) {
    const createPokemonObject = (results) => {
      results.forEach( async (pokemon) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setAllPokemon(prev => [...prev, response.data]);
        
      }) 
    }
    createPokemonObject(pokedata)
  }
},[pokedata])

const goToNextPage = ()=> {
  setCurrentPage(nextPage);
  setAllPokemon([]);
}

const goToPrevPage = ()=> {
  setCurrentPage(prevPage);
  setAllPokemon([]);
}

const handleChangueSelect = (e) => {
  setTypeSelected(e.target.value);
  setOffset(0);
}

let limit = 20;

useEffect(()=>{
if (typeSelected) {
  if(typeSelected === 'all'){
    window.location.reload();

  }else{
    const getInfo = async () => {
      let data = await axios.get(`https://pokeapi.co/api/v2/type/${typeSelected}`)
      let array = [];
      data.data.pokemon.forEach(x => {
        array.push(x.pokemon)
      })
      setRange(Math.ceil(array.length / 20));
      setAllPokemon([]);
      setNextPage();
      setPrevPage();
      setPokeData(array.slice(offset * limit , limit * (offset +1) ));
    }
    getInfo();
  }
  
}

},[typeSelected, limit, offset])
  

const handleTypeNext = () => {
  setOffset(prev => prev + 1)
}

const handleTypePrev = () => {
  setOffset(prev => prev -1)
}

useEffect(()=> {
if (offset === 0) {
  setPrevBUtton(null)
} else{
  setPrevBUtton(true)
}

if (offset >= range) {
  setNextButtton(null)
} else{
  setNextButtton(true)
}


},[offset, range])

  return (
   <Switch>
      <Route exact path={`${path}/:pokemon`} >
            <DetailsPage/>
      </Route>
     <Route path={path}>
     <div className='searchPage' >
    {
    
    loading ? <div className='loading'>loading...</div> : 

    <div className='searchPageContainer'>
      <h3 className='user'> Master: {user} </h3> 
      <button onClick={logout} className='logoutbutton'>Logout</button>
      <h1>Busca el pokemón</h1>
      <FormSearcher handleChangueSelect={handleChangueSelect} />
      <div className='sectionCard'>
      {allPokemon.map((pokemon, index) => 
      <CardPokemon 
      id={pokemon.id}
      name={pokemon.name}  
      image={pokemon.sprites.other.dream_world.front_default}
      type={pokemon.types[0].type.name}
      key={index}
      /> 
      )}
      </div>

        {range? 
          <div className='buttonsContainerTypeNext'>
          {prevButton? <button onClick={handleTypePrev}>Prev</button>: ''}
          {nextButton? <button onClick={handleTypeNext}>Next</button>: ''}
          </div>
          : ''}
  
      <Pagination 
      goToNextPage={nextPage? goToNextPage: null} 
      goToPrevPage={prevPage? goToPrevPage: null} />
    </div>
    }
  </div>
     </Route>
   </Switch>
  )
}

export default SearchPage
