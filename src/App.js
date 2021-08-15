import './app.css';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [user, setUser] = useState(window.localStorage.getItem('user'))

const setLocalStorage = e =>{
  try{
    setUser(e.target.value)
    window.localStorage.setItem('user', e.target.value)
  } catch(error){
    console.log(error)
  }
  
}



const logout = () =>{
  setUser(null);
  window.localStorage.clear()
}


  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path='/' >
            <LoginPage setLocalStorage={setLocalStorage} />
            </Route>
            <PrivateRoute path='/search' user={user} component={SearchPage} logout={logout} />
            <Route path='*'>
              <Redirect to='/' />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
