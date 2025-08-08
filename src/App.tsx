//React
import { Route, Routes } from 'react-router'
//CSS
import './App.css'
//layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout'
//pages
import AuthSignUp from './pages/Auth/AuthSignUp'
import AuthLogin from './pages/Auth/AuthLogin'
import HomeLayout from './layouts/HomeLayout/HomeLayout'


function App() {

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<AuthLogin/>}/>
        <Route path="signup" element={<AuthSignUp/>}/>
      </Route>
      <Route path="/" element={<HomeLayout/>}>
        <Route path="overview" element={"test"}/>
        <Route path="transactions" element={"budgets"}/>
        <Route path="budgets" element={"budgets"}/>
        <Route path="pots" element={"budgets"}/>
        <Route path="recurring-bills" element={"budgets"}/>
      </Route>
    </Routes>
  )
}

export default App
