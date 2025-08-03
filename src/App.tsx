//React
import { Route, Routes } from 'react-router'
//CSS
import './App.css'
//layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout'
//pages
import AuthSignUp from './pages/Auth/AuthSignUp'
import AuthLogin from './pages/Auth/AuthLogin'


function App() {

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<AuthLogin/>}/>
        <Route path="signup" element={<AuthSignUp/>}/>
      </Route>
    </Routes>
  )
}

export default App
