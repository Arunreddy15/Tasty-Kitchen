// import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import './App.css'
import RestaurantItems from './components/RestaurantItems'

import SuccessPayment from './components/SuccessPayment'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/restaurant/:id" component={RestaurantItems} />
    <ProtectedRoute exact path="/success" component={SuccessPayment} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute path="/bad-path" component={NotFound} />
    <ProtectedRoute component={NotFound} />
  </Switch>
)

export default App
