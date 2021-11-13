import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
  </Routes>
)

export default App
