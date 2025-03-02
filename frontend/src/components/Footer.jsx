export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          
          {/* Logo / Brand Name */}
          <div className="text-lg font-bold">ASD Detection</div>
  
          {/* Navigation Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Services</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
  
          {/* Social Media Links (Placeholder) */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">📘</a> {/* Facebook */}
            <a href="#" className="hover:text-gray-400">🐦</a> {/* Twitter */}
            <a href="#" className="hover:text-gray-400">📷</a> {/* Instagram */}
          </div>
  
        </div>
  
        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} ASD Detection. All Rights Reserved.
        </div>
      </footer>
    );
  }
  