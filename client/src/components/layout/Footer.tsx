import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-white font-bold text-2xl">Bongo</span>
              <span className="text-secondary font-bold text-2xl">Selekt</span>
            </div>
            <p className="mb-4">Premium thrift shopping in Nigeria. Find curated secondhand treasures at amazing prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/seller-guidelines" className="hover:text-white">Seller Guidelines</Link></li>
              <li><Link href="/verification" className="hover:text-white">Verification Process</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=Furniture" className="hover:text-white">Furniture</Link></li>
              <li><Link href="/products?category=Electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/products?category=Clothing" className="hover:text-white">Clothing</Link></li>
              <li><Link href="/products?category=Home%20Goods" className="hover:text-white">Home Goods</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:text-white">Return Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Information</Link></li>
              <li><Link href="/report" className="hover:text-white">Report an Issue</Link></li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <a href="#" className="block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" className="h-8">
                    <path fill="#A6A6A6" d="M110.13,0H9.53c-.3,0-.6,0-.9,0a13.17,13.17,0,0,0-2,.19,6.51,6.51,0,0,0-1.9.63A6.22,6.22,0,0,0,3.16,1.9a6.7,6.7,0,0,0-1.1,1.58,6.19,6.19,0,0,0-.61,1.9A12.28,12.28,0,0,0,1.26,7.3C1.25,7.6,1.25,7.9,1.24,8.2V31.8c0,.3,0,.6,0,.9a12.28,12.28,0,0,0,.19,2,6.19,6.19,0,0,0,.61,1.9A6.7,6.7,0,0,0,3.16,38.18a6.22,6.22,0,0,0,1.58,1.1,6.51,6.51,0,0,0,1.9.63,13.17,13.17,0,0,0,2,.19c.3,0,.6,0,.9,0H110.13c.3,0,.6,0,.9,0a13.17,13.17,0,0,0,2-.19,6.51,6.51,0,0,0,1.9-.63,6.22,6.22,0,0,0,1.58-1.1,6.7,6.7,0,0,0,1.1-1.58,6.19,6.19,0,0,0,.61-1.9,12.28,12.28,0,0,0,.19-2c0-.3,0-.6,0-.9V8.2c0-.3,0-.6,0-.9a12.28,12.28,0,0,0-.19-2,6.19,6.19,0,0,0-.61-1.9A6.7,6.7,0,0,0,116.5,1.82a6.22,6.22,0,0,0-1.58-1.1,6.51,6.51,0,0,0-1.9-.63,13.17,13.17,0,0,0-2-.19c-.3,0-.6,0-.9,0H0Z"/>
                    <path fill="#FFFFFF" d="M8.44,39.13a4.25,4.25,0,0,1-1.31-.37,3.39,3.39,0,0,1-1.1-.75A3.32,3.32,0,0,1,5.31,36.9a5.54,5.54,0,0,1-.39-1.41,11.43,11.43,0,0,1-.16-1.94c0-.3,0-.6,0-.89V7.34c0-.29,0-.59,0-.89A11.43,11.43,0,0,1,4.92,4.51,5.54,5.54,0,0,1,5.31,3.1a3.32,3.32,0,0,1,.72-1.11,3.39,3.39,0,0,1,1.1-.75,4.25,4.25,0,0,1,1.31-.37c.42,0,.83-.08,1.39-.1.31,0,.61,0,.91,0H109.67c.3,0,.61,0,.92,0,.56,0,1,.07,1.38.1a4.25,4.25,0,0,1,1.31.37,3.39,3.39,0,0,1,1.1.75,3.32,3.32,0,0,1,.72,1.11,5.54,5.54,0,0,1,.39,1.41,11.43,11.43,0,0,1,.16,1.94c0,.3,0,.6,0,.89V32.66c0,.29,0,.59,0,.89a11.43,11.43,0,0,1-.16,1.94,5.54,5.54,0,0,1-.39,1.41,3.32,3.32,0,0,1-.72,1.11,3.39,3.39,0,0,1-1.1.75,4.25,4.25,0,0,1-1.31.37c-.42,0-.83.08-1.39.1-.31,0-.61,0-.91,0H8.44Z"/>
                    <path fill="#000000" d="M42,25.9c2.89-3.16,4.41-6.13,3.53-9.51-1.58-6.09-6.2-8.55-9.48-8.79a10.83,10.83,0,0,0-4.37.66C30,9,28.77,10,27.5,10c-1.36,0-2.67-1-4.23-1.06a11.51,11.51,0,0,0-5.85,1.55c-3.52,2.08-5.66,7.3-2.91,13.84,1.23,2.92,2.93,6.24,5.18,6.29,1.15,0,1.95-.79,3.65-.79,1.59,0,2.19.79,3.58.81,2.57,0,4.18-3.11,5.41-6A9.84,9.84,0,0,1,36,22.08,9.62,9.62,0,0,1,42,25.9ZM32.46,6.11a9.4,9.4,0,0,0,2.35-7.1,9.76,9.76,0,0,0-6.46,3.22A9.41,9.41,0,0,0,25.72,9.5,8.41,8.41,0,0,0,32.46,6.11Z"/>
                    <path fill="#000000" d="M54.28,10H54c-3.65,0-5.34,2.8-5.34,5.61s2,5.5,4.88,5.5a5.36,5.36,0,0,0,5.38-5.68S56.76,10,54.28,10Zm13.23.43c-.95,0-1.86.45-2.51,1.55h0V10.36H61.85V31.08H65.1V21h0c.57,1.1,1.65,1.69,2.65,1.69,3,0,4.69-3.34,4.69-6.24S70.27,10.44,67.51,10.44ZM66.6,19.38c-1.22,0-2.32-1.38-2.34-3.81s1.11-3.73,2.29-3.73S69,13.91,69,16,67.94,19.38,66.6,19.38Zm-12.51,0c-1.57,0-2.49-1.6-2.49-3.9s.92-3.76,2.48-3.76S56.56,13.4,56.56,15.4,55.66,19.38,54.09,19.38ZM82,10.36H78.76v6.86h0c-.66-1-1.59-1.65-2.76-1.65-2.7,0-4.35,3.09-4.35,6.33s1.92,6.17,4.52,6.17c1,0,2-.52,2.6-1.81h0v1.47h3.26ZM74.78,18.53c-.06,2.15,1,3.71,2.28,3.71s2.37-1.55,2.37-3.79-1.07-3.75-2.3-3.75S74.83,16.38,74.78,18.53Zm14.63-8.17H86.16V31.08h3.25ZM87.79,8.63a1.65,1.65,0,0,0,1.75-1.72A1.76,1.76,0,0,0,87.83,5.2a1.75,1.75,0,0,0-1.73,1.71A1.64,1.64,0,0,0,87.79,8.63ZM97.85,10h-3.25V31.08h3.25Zm-1.62-1.41a1.65,1.65,0,0,0,1.74-1.71A1.75,1.75,0,0,0,96.23,5.2a1.75,1.75,0,0,0-1.72,1.71A1.64,1.64,0,0,0,96.23,8.63Zm14,13.83c0-4.48-1.93-7.49-5.49-7.49s-5.61,3-5.61,7.52,1.93,7.51,5.8,7.51a7.49,7.49,0,0,0,4.86-1.73l-1.24-2.06a5.4,5.4,0,0,1-3.26,1.18c-1.74,0-3-1.09-3.14-3.27h7.85A13.78,13.78,0,0,0,110.22,22.46Zm-8.08-1.67c0-2.11.91-3.38,2.52-3.38s2.37,1.27,2.48,3.38Z"/>
                  </svg>
                </a>
                <a href="#" className="block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" className="h-8">
                    <path fill="#FFFFFF" d="M110.23,0H9.54a9.64,9.64,0,0,0-9.54,9.53V30.46a9.64,9.64,0,0,0,9.54,9.54H110.23a9.65,9.65,0,0,0,9.53-9.54V9.53A9.65,9.65,0,0,0,110.23,0Z"/>
                    <path fill="#000000" d="M110.23.87a8.61,8.61,0,0,1,8.65,8.65V30.47a8.61,8.61,0,0,1-8.65,8.65H9.55A8.61,8.61,0,0,1,.9,30.47V9.52A8.61,8.61,0,0,1,9.55.87ZM8.55,38.63H111.22a8.14,8.14,0,0,0,8.16-8.16V9.52A8.14,8.14,0,0,0,111.22,1.37H8.55a8.14,8.14,0,0,0-8.16,8.15V30.47A8.14,8.14,0,0,0,8.55,38.63Z"/>
                    <path fill="#000000" d="M60.17,17.42a4.79,4.79,0,0,0,1.1-3.49,5,5,0,0,0-4.67-5.25H50.93V29.42h6a5.18,5.18,0,0,0,5.42-5.14A4.82,4.82,0,0,0,60.17,17.42ZM52.66,10.12H56.6a3.46,3.46,0,0,1,3.57,3.63,3.45,3.45,0,0,1-3.57,3.63H52.66ZM56.64,28H52.65V18.82h4a3.88,3.88,0,1,1,0,9.17Zm18.45-8.91H64.76v-2.6h9.46V15.07H64.76V12.48h10.3V10.12H63v19.3h12.2V28H64.77V19.08ZM79,10.12V29.41h1.73V10.12ZM93.31,29.42h1.55l-5.7-19.3H87.62L82,29.42h1.53l1.26-4.34h7.33Zm-8-5.7,3.23-11,3.13,11Zm19.38-7.73c0-2.79-1.77-4.8-4.13-4.8a3.87,3.87,0,0,0-3.4,1.9H97.1l-.22-1.73H95.4c.07,1,.1,2.26.1,3.67V29.42h1.73V20.49H97.2a3.38,3.38,0,0,0,3.32,2c2.63,0,4.13-2.06,4.13-4.84v-.64Zm-1.73.58c0,2-1,3.45-2.8,3.45a3.13,3.13,0,0,1-3-3.52V16.3a3,3,0,0,1,2.95-3.48c1.92,0,2.83,1.6,2.83,3.51v.24ZM40.28,20.37V12.25h-.89V10.51h.89V10c0-1.27.32-2.57,1.13-3.37a3.79,3.79,0,0,1,2.67-1c.69,0,1.23.11,1.74.24l-.25,1.76a3.71,3.71,0,0,0-1.16-.16c-1.58,0-2.4,1.27-2.4,3V10.5h3v1.74h-3v8.12c0,1.26.33,2.09,1.63,2.09a5.83,5.83,0,0,0,1.67-.32L45.51,24a6.62,6.62,0,0,1-2.05.32C41.08,24.27,40.28,22.68,40.28,20.37Z"/>
                    <path fill="#757575" d="M24.3,15.96c0-.9.34-2.51,2.42-2.51,1.09,0,2.3.57,3.05,1.59l1.13-1.12c-1.04-1.17-2.43-1.78-3.95-1.78-2.51,0-4.19,1.88-4.19,4s1.5,3.27,3.46,4.13l1.09.47c1.44.64,2.26,1.25,2.26,2.46,0,1.25-.95,2.22-2.55,2.22a4.81,4.81,0,0,1-3.67-1.89l-1.24,1.22c1.3,1.55,2.8,2.33,4.81,2.33,2.95,0,4.34-1.9,4.34-4.06,0-2.13-1.22-3.1-3.29-4L24.9,17.83C23.93,17.36,23.17,16.82,23.17,15.96Z"/>
                    <path fill="#757575" d="M34.66,7.93V26.5h1.73v-7.9h0a3.86,3.86,0,0,0,3.39,1.93c2.36,0,4.13-2,4.13-4.83V15c0-2.78-1.5-4.84-4.13-4.84a3.87,3.87,0,0,0-3.4,1.9h0l-.21-1.73h-1.47C34.63,11.35,34.66,12.56,34.66,13.97Zm4.8,16.14c-2.05,0-3.11-1.76-3.11-3.48v-.24a3.41,3.41,0,0,1,3-3.68h.07c1.92,0,2.83,1.6,2.83,3.52v.19C42.26,22.38,41.22,24.07,39.46,24.07Z"/>
                    <path fill="#3B82F6" d="M20.8,24.15c-4.52,0-8.19-3.66-8.19-8.18s3.67-8.17,8.19-8.17A8.17,8.17,0,0,1,26.13,10l1.36-1.36A10.06,10.06,0,0,0,20.8,5.9a10.15,10.15,0,0,0,0,20.3,10.08,10.08,0,0,0,6.66-2.6l-1.36-1.33A8.13,8.13,0,0,1,20.8,24.15Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Bongo Selekt. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
