import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  // Estado para el formulario de newsletter
  const [email, setEmail] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [profilingChecked, setProfilingChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.trim()) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
  
    setIsSubmitting(true);
    setErrors({});
  
    try {
      const templateParams = {
        email: email.trim(),
        name: "Kꓘarmx Newsletter",
        brand_name: 'KꓘarmX',
        discount_code: '3FMPVL',
        current_year: new Date().getFullYear(),
        welcome_message: 'Thank you for joining our community!',
        discount_percentage: '10',
        shop_link: 'https://tutienda.com'
      };
  
      await emailjs.send(
        'service_d6spzlh',
        'template_xzic1a5',
        templateParams,
        'gZALR7ztjjMkQ00S9'
      );
  
      setSuccessMessage('¡Email sent successfully!');
      setEmail('');
      
    } catch (error) {
      console.error('Error:', error);
      setErrors({ form: 'Failed to send. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white text-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Primera fila - Formulario izquierda / Contenido derecho */}
        <div className="flex flex-col lg:flex-row gap-10 mb-10 justify-between">
          {/* Columna del formulario */}
          <div className="lg:w-[40%]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase">
                <span className="font-extrabold">JOIN THE K<span className="mirror">K</span>armx COMMUNITY</span>
              </h2>
              <p className="mt-2 text-gray-700">
                Join our mailing list and enjoy up to 10% off your first order. Stay up to date with K<span className="mirror">K</span>armx's new arrivals, promotions and events.
              </p>
            </div>
  
            {successMessage && (
              <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">
                {successMessage}
              </div>
            )}
  
            {errors.form && (
              <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
                {errors.form}
              </div>
            )}
  
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                    placeholder=" "
                  />
                  <label 
                    htmlFor="newsletter-email" 
                    className={`absolute left-4 top-3 text-gray-500 transition-all pointer-events-none ${email ? 'transform -translate-y-7 left-2 text-xs bg-white px-2' : ''}`}
                  >
                    Your Email
                  </label>
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
  
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-shrink-0 px-5 py-3 bg-black text-white hover:bg-gray-900 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <svg 
                    className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} 
                    viewBox="0 0 22 22" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5L13 11L8 17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
  
              <div className="space-y-4">
                <div className={`flex items-start ${errors.privacy ? 'text-red-500' : ''}`}>
                  <div className="flex items-center h-5 mt-1 mr-2">
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={(e) => setPrivacyChecked(e.target.checked)}
                      className={`w-4 h-4 border ${errors.privacy ? 'border-red-500 text-red-500' : 'border-gray-300 text-black'} rounded focus:ring-black`}
                    />
                  </div>
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    *I have read the <a href="/en-es/privacy-policy" className="underline hover:text-black">Privacy Policy</a> and consent to the processing of my personal data for marketing purposes (Newsletters, News and Promotions)
                  </label>
                </div>
  
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1 mr-2">
                    <input
                      id="profiling"
                      type="checkbox"
                      checked={profilingChecked}
                      onChange={(e) => setProfilingChecked(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 text-black rounded focus:ring-black"
                    />
                  </div>
                  <label htmlFor="profiling" className="text-sm text-gray-700">
                    Consent for profiling
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Columnas de enlaces */}
          <div className="lg:w-[40%]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Columna HELP */}
              <div>
                <h3 className="font-bold uppercase mb-4">HELP</h3>
                <ul className="space-y-3">
                  <li><a href="https://off---white.zendesk.com/hc/en-us" className="hover:underline">Customer Care</a></li>
                  <li><a href="https://off---white.zendesk.com/hc/en-us/categories/17459924787100-Shipping-and-Delivery" className="hover:underline">Shipping & Delivery</a></li>
                  <li><a href="https://off---white.zendesk.com/hc/en-us/categories/17459941324188-Returns" className="hover:underline">Returns & Refunds</a></li>
                  <li><a href="https://off---white.zendesk.com/hc/en-us/requests/new" className="hover:underline">Contact Us</a></li>
                  <li><a href="/en-es/track-order" className="hover:underline">Order Tracking</a></li>
                  <li><a href="/en-es/stores" className="hover:underline">Store Locator</a></li>
                </ul>
              </div>
  
              {/* Columna LEGAL AREA */}
              <div>
                <h3 className="font-bold uppercase mb-4">LEGAL AREA</h3>
                <ul className="space-y-3">
                  <li><a href="/en-es/terms-and-conditions-of-use/" className="hover:underline">Terms and Conditions</a></li>
                  <li><a href="/en-es/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                  <li><a href="/en-es/cookie-policy" className="hover:underline">Cookie Policy</a></li>
                  <li><a href="/en-es/sitemap" className="hover:underline">Sitemap</a></li>
                </ul>
              </div>

              {/* Columna de país/idioma y redes */}
              <div>
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-1">Country:</h4>
                  <p>Spain</p>
                  <h4 className="text-sm font-medium mt-3 mb-1">Language:</h4>
                  <p>English</p>
                </div>
                
                <p className="mb-4">Follow us on:</p>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/offwhitetrademarksymbol/" className="text-black hover:text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/off____white/" className="text-black hover:text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://x.com/OffWht" className="text-black hover:text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center lg:text-left">© {new Date().getFullYear()} K<span className="mirror">K</span>armx™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;