
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const useIsAuthenticated = () => {
  const token = Cookies.get("token")
  return !!token
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useIsAuthenticated()
  
  if (isAuthenticated) {
    return <Component {...rest} />
  } else {
    return <Navigate to="/login" replace />
  }
}

export default PrivateRoute
