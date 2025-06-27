import { createBrowserRouter } from 'react-router';
import Root from './../Root/Root';
import ErrorPage from './../Page/ErrorPage/ErrorPage';
import Home from './../Page/Home/Home';
import AllPlants from './../Planting/AllPlant';
import ContactUs from './../Page/ContactUs';
import AboutUs from './../Page/AboutUs';
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import DashboardLayout from './../DashBoard/DashboardLayout';
import UserDashboard from './../DashBoard/UserDashboard';
import MyPlants from './../Planting/MyPlants';
import AddPlant from './../Planting/AddPlant';
import UpdatePlants from './../Planting/UpdatePlants';
import UserProfile from './../Page/UserProfile/UserProfile';
import UpdateProfile from './../Page/UpdateProfile/UpdateProfile';
import PlantDetails from './../Planting/PlantDetails';
import LoginForm from './../Page/LoginForm/LoginForm';
import RegisterForm from './../Page/RegisterForm/RegisterForm';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      
    ],
  },
  
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>, 
    children: [
      {
        index: true, 
        element: <UserDashboard />,
      },
      {
        path: "my-plants",
        element: <MyPlants />, 
      },
      {
        path: "add-plant",
        element: <AddPlant />,
      },
      {
        path: "update-plant/:id",
        element: <UpdatePlants />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "plants/:id", 
        element: <PlantDetails />,
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
  {
    path: '*',
    element: <ErrorPage />,
  },
]);