//React
import { Route, Routes } from 'react-router'
//CSS
import './App.css'
//layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout'


function App() {

  return (
    <Routes>
      <Route path="/login" element={<AuthLayout/>}>
        
      </Route>
    </Routes>
  )
}

export default App
