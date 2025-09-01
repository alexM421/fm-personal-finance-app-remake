//React
import { Route, Routes } from 'react-router'
//CSS
import './App.css'
//layouts
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
//pages
import AuthSignUp from './pages/Auth/AuthSignUp'
import AuthLogin from './pages/Auth/AuthLogin'
import Overview from './pages/Overview/Overview'
import Transactions from './pages/Transactions/Transactions'
import Budgets from './pages/Budgets/Budgets'
import Pots from './pages/Pots/Pots'


function App() {

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<AuthLogin/>}/>
        <Route path="signup" element={<AuthSignUp/>}/>
      </Route>
      <Route path="/" element={<HomeLayout/>}>
        <Route path="overview" element={<Overview/>}/>
        <Route path="transactions" element={<Transactions/>}/>
        <Route path="budgets" element={<Budgets/>}/>
        <Route path="pots" element={<Pots/>}/>
        <Route path="recurring-bills" element={"budgets"}/>
      </Route>
    </Routes>
  )
}

export default App
