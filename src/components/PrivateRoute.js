import { Redirect, Route } from "react-router-dom"


const PrivateRoute = ({component: Component, user, logout, ...rest}) => {

  return <Route {...rest}>
        {user? <Component user={user} logout={logout}/> : <Redirect to='/'/> }
        </Route>
}



export default PrivateRoute
