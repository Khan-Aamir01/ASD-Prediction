import { Link } from "react-router-dom";
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-0">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          
          {/* Logo / Brand Name */}
          <div className="text-lg font-bold">ASD Prediction</div>
  
          {/* Navigation Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" href="#" className="hover:text-gray-400">Home</Link>
            <Link to="/about" href="#" className="hover:text-gray-400">About</Link>
            <Link to="/services" href="#" className="hover:text-gray-400">Services</Link>
            <Link to="/contact" href="#" className="hover:text-gray-400">Contact</Link>
          </div>
  
          {/* Social Media Links (Placeholder) */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://ih1.redbubble.net/image.4084677136.7237/st,small,507x507-pad,600x600,f8f8f8.u3.jpg" target="_blank" className="hover:text-gray-400">📘</a> {/* Facebook */}
            <a href="https://www.youtube.com/shorts/SXHMnicI6Pg" target="_blank" className="hover:text-gray-400">🐦</a> {/* Twitter */}
            <a href="https://preview.redd.it/waityouguysaregettingpaid-v0-omd0lsc1j3yc1.png?auto=webp&s=499c3a1290a0438972c5beec71f03e94ba674748" target="_blank" className="hover:text-gray-400">📷</a> {/* Instagram */}
          </div>
  
        </div>
  
        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} Thousand Sunny &#128526;. All Rights Reserved.
        </div>
      </footer>
    );
  }
  