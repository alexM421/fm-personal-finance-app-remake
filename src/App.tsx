//React
import { Route, Routes } from 'react-router'
//CSS
import './App.css'
//layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout'
//pages
import Auth from './pages/Auth/Auth'


function App() {

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route index element={<Auth/>}/>
      </Route>
    </Routes>
  )
}

export default App
