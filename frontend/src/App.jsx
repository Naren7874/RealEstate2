import "./navbar";
import "./pages/homepage/homepage"
import Homepage from "./pages/homepage/homepage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout,RequireAuth } from "./pages/layout/layout";
import Listpage from "./pages/listPages/listpage";
import Singlepage from "./pages/singlePage/singlepage";
import Profile from "./pages/profile/profile";
import ProfileUpdate from "./pages/profileUpdate/profileUpdate";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children : [
         {
          path: "/",
          element: <Homepage />,
         },
         {
          path : "/list",
          element :<Listpage/>
         },
         {
          path : "/:id",
          element :<Singlepage/>
         },
         {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register/>,
        },
      ]
    },
    {//routes which depend on login(RequireAuth)
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path : "/profile",
          element :<Profile />
         },
         {
          path:"/profile/update",
          element:<ProfileUpdate/>
         }
      ]
    }
  ]);
  return (
      <RouterProvider router={router}/>
  )
}
export default App