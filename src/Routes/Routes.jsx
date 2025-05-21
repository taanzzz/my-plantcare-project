import { createBrowserRouter } from 'react-router';
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import LoginForm from './../Page/LoginForm/LoginForm';
import RegisterForm from './../Page/RegisterForm/RegisterForm';
import AllPlants from './../Planting/AllPlant';
import PlantDetails from './../Planting/PlantDetails';
import AddPlant from './../Planting/AddPlant';
import MyPlants from './../Planting/MyPlants';
import Home from './../Page/Home/Home';
import Root from './../Root/Root';
import MyProfile from './../Page/MyProfile/MyProfile';
import UserProfile from './../Page/UserProfile/UserProfile';
import UpdatePlants from './../Planting/UpdatePlants';

export const router = createBrowserRouter([
  {
  path: "/",
  element: <Root />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "all-plants",
      element: <AllPlants />,
    },
    {
      path: "plants/:id",
      element: <PrivateRoute><PlantDetails /></PrivateRoute>,
    },
    {
      path: "add-plant",
      element: <PrivateRoute><AddPlant /></PrivateRoute>,
    },
    {
      path: "my-plants",
      element: <PrivateRoute><MyPlants /></PrivateRoute>,
    },
    {
      path: "update-plant/:id",
      element: <PrivateRoute><UpdatePlants /></PrivateRoute>,
    },
        {
          path: "profile",
          element: <MyProfile />,
        },
        {
          path: "user-profile",
          element: <UserProfile />,
        },
  ],
},

  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
]);
