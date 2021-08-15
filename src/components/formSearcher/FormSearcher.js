import '../formSearcher/formSearcher.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
const FormSearcher = ({handleChangueSelect}) => {
 let {url} = useRouteMatch();
 

  const [valueTypes, setValueTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [pokemonsName, setPokemonsName] = useState([]);
  const [suggestionsPokemons, setSuggestionsPokemons] = useState([]); 

  useEffect(() => {
    const getValueInfo = async () => {
      let data = await axios.get('https://pokeapi.co/api/v2/type')
      setValueTypes(data.data.results);
    }
    getValueInfo();
    
  }, [])

  const list = valueTypes.map((x, index) => <option key={index} value={x.name}>{x.name}</option>)

 
  useEffect(()=>{
    const getSugestions = async () =>{
      let data = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118');
      setPokemonsName(data.data.results);
    }
    getSugestions();
  },[])

  const getQuerySearch = (e) => {
    let matches = [];
    if (search.length > 0) {
      matches = pokemonsName.filter( pokemons => {
        const regex = new RegExp(`${search}`, 'gi')
        return pokemons.name.match(regex);
      })
    }
    setSuggestionsPokemons(matches)
    setSearch(e.target.value)
  }

 
  return (
    <div className='form'>
      <div className='inputButtonContainer'>
        <input type="text" placeholder='Escribe el nombre del pokemón'  onChange={getQuerySearch} value={search} />
        <div className='sugesstionsContainer'> <span>sugerencias: </span> {suggestionsPokemons && suggestionsPokemons.slice(0,12).map((x, i) => <Link key = {i} to={`${url}/${x.name}`}>{x.name}</Link> )}</div>
      </div>
        <select onChange={handleChangueSelect} name="types" id="select">
          <option value="all">All</option>
          {list}
        </select>
    </div>
  )
}

export default FormSearcher
