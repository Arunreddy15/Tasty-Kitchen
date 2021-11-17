import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const jwtToken = Cookies.get('jwt_token')
const ProtectedRoute = props => {
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return {...props}
}
export default ProtectedRoute
