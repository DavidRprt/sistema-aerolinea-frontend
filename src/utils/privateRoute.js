
import { Route, useLocation, Navigate } from "react-router-dom"

const useIsAuthenticated = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser")
  return !!loggedUserJSON
}

const PrivateRoute = ({ children, path }) => {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (isAuthenticated) {
    return <Route path={path} element={children} />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}


export default PrivateRoute
