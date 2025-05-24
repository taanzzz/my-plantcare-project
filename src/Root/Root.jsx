import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from 'react-router';
import Footer from './../Component/Footer/Footer';

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar></Navbar>
     <div className=''> <Outlet></Outlet>
     </div>
      <Footer></Footer>
    </div>
  );
};

export default Root
