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

function App() {

  return (
    <>

      <Routes>

        <Route path="/" element={
          <>
          <Nav/>
          <Home/>
          </>
        }/>

        <Route path="/sample" element={<Sample/>} />

        <Route path="/dashboard" element={<Dashboardlayout />}>
          <Route index element={<Dashboardhome />} />
          <Route path="inbox" element={<Inbox />}>
            <Route index element={<InboxPage/>}/>
          </Route>
          <Route path="spend" element={<Spend />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="account" element={<Account />}>
              <Route index element={<Profile/>}/>
              <Route path="wallet" element={<Wallet/>}/>
              <Route path="expense" element={<Expense/>}/>
              <Route path="agents" element={<Agents/>}/>
          </Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
