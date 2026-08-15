import Nav from "./components/Nav"
import Home from "./pages/Home"
import Dashboardlayout from "./Layouts/Dashboardlayout"
import Account from "./pages/dashboard/Account"
import Dashboardhome from "./pages/dashboard/Dashboardhome"
import Inbox from "./pages/dashboard/Inbox"
import Spend from "./pages/dashboard/Spend"
import Workspaces from "./pages/dashboard/Workspaces"
import { Route, Routes } from "react-router-dom"
import Profile from "./pages/account/Profile"
import Wallet from "./pages/account/Wallet"
import Expense from "./pages/account/Expense"
import Agents from "./pages/account/Agents"
import InboxPage from "./pages/inbox/InboxPage"
import Sample from "./pages/Sample"
import useToggle from "./components/useToggle"

function App() {

  const [dark, toggleDark] = useToggle(true);

  return (
    <>

      <Routes>

        <Route path="/" element={
          <>
          <Nav dark = {dark} useToggle={toggleDark}/>
          <Home dark = {dark}/>
          </>
        }/>

        <Route path="/sample" element={<Sample dark = {dark}/>} />

        <Route path="/dashboard" element={<Dashboardlayout useToggle={toggleDark} dark = {dark}/>}>
          <Route index element={<Dashboardhome dark = {dark}/>} />
          <Route path="inbox" element={<Inbox dark = {dark}/>}>
            <Route index element={<InboxPage dark = {dark}/>}/>
          </Route>
          <Route path="spend" element={<Spend dark = {dark}/>} />
          <Route path="workspaces" element={<Workspaces dark = {dark}/>} />
          <Route path="account" element={<Account dark = {dark}/>}>
              <Route index element={<Profile dark = {dark}/>}/>
              <Route path="wallet" element={<Wallet dark = {dark}/>}/>
              <Route path="expense" element={<Expense dark = {dark}/>}/>
              <Route path="agents" element={<Agents dark = {dark}/>}/>
          </Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
