import ButtonPrimary from '../../components/button/ButtonPrimary.js'
import '../LoginPage/loginPage.css'

let backGrounds = {
  0: 'https://tomategrafico.com/assetstmt/bulbasor.png',
  1: 'https://tomategrafico.com/assetstmt/Evy.png',
  2: 'https://tomategrafico.com/assetstmt/new.png',
  3: 'https://tomategrafico.com/assetstmt/raichu.png',
  4: 'https://tomategrafico.com/assetstmt/slas.png'
}

let randomNum = Math.round(Math.random() * (4 - 0) + 0);
let randomBg = `url(${backGrounds[randomNum]})`


const LoginPage = ({setLocalStorage}) => {

  return ( 
    <div className='loginPage' style={{backgroundImage: randomBg}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="" />
        <form >
          <input type="text" placeholder='Ingresa tu nombre para empezar...' onChange={setLocalStorage}  />
          <ButtonPrimary to={'/search'} text={'Ingresar'}/>
        </form>
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="" />
      <h2 className='title'>Pokesearch es una aplicación donde podrás encontrar la información de todos los pokemones...</h2>
    </div>
  )
}

export default LoginPage
