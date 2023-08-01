import{
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom"
import Ragistration from "./pages/Ragistration"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Massage from "./pages/Massage"
import Notification from "./pages/Notification"
import Settings from "./pages/Settings"
import RootLayout from "./pages/Components/RootLayout"


const router = createBrowserRouter(
  createRoutesFromElements(
          <>
          <h2> jibon tamim moy</h2>
            
                <Route path="/"element={<Ragistration/>}></Route>

                <Route path="/login"element={<Login/>}></Route>

                <Route path="/forgotpassword"element={<ForgotPassword/>}></Route>

                <Route path="/bachal"element={<RootLayout/>}>

                <Route path="home"element={<Home/>}></Route>

                <Route path="massage"element={<Massage/>}></Route>

                <Route path="notification"element={<Notification/>}></Route>

                <Route path="settings"element={<Settings/>}></Route>

                </Route>

          </>
  )
)


function App() {
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  )
}

export default App
