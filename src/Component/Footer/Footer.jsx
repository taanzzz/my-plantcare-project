import { FaFacebookF, FaInstagram, FaLeaf, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-green-50 text-green-800 border-t border-green-200 mt-12">
      <div className="max-w-screen-xl mx-auto px-3 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <div className="flex items-center text-green-700 text-xl font-bold mb-2">
            <FaLeaf className="text-green-500 mr-2 text-2xl" />
            Plant Care
          </div>
          <p className="text-sm text-green-700">
            Your digital assistant for healthy,thriving plants.Track watering,fertilizing and more with ease.
          </p>
        </div>

        
        <div>
          <h3 className="text-green-600 font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/all-plants" className="hover:underline">All Plants</Link></li>
            <li><Link to="/add-plant" className="hover:underline">Add Plant</Link></li>
            <li><Link to="/my-plants" className="hover:underline">My Plants</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-green-600 font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@plantcaretracker.com</p>
          <p className="text-sm">Phone: +880 1234 567 890</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>

       
        <div>
          <h3 className="text-green-600 font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-green-600">
            <a href="https://www.facebook.com" className="hover:text-green-800"><FaFacebookF className="text-blue-500 "/></a>
            <a href="https://www.instagram.com/" className="hover:text-green-800"><FaInstagram className="text-pink-500" /></a>
            <a href="https://x.com/" className="hover:text-green-800"><FaTwitter className="text-blue-500" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-green-200 bg-green-100">
        © {new Date().getFullYear()} Plant Care Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
