import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 font-sans bg-white relative min-h-screen">

        <div className="mb-8 border-b border-dashed border-gray-300 pb-6">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Contact Us</h1>
        </div>


        <div className="mb-8 text-gray-700">
          <p className="mb-3">If you have questions about your order or need further assistance, our customer service team will be happy to help.</p>
          <p className="mb-3">Complete the form below by selecting a subject, then type your question or comment and we will get back to you as soon as possible.</p>
          <p>Send us your feedback: it's always very important to us.</p>
        </div>

        <form className="space-y-6" >
          <div className="flex items-center justify-between gap-4">
            <label for="email" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Email</label>
            <input type="email" id="email" required
              className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent"></input>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label for="language" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Language</label>
            <select id="language" className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent">
              <option value="">-</option>
              <option value="english_ow">English</option>
              <option value="italian_ow">Italian</option>
              <option value="german_ow">German</option>
              <option value="french_ow">French</option>
              <option value="spanish_ow">Spanish</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label for="country" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Country</label>
            <select id="country" className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent">
              <option value="">-</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="IT">Italy</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="ES">Spain</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label for="first_name" className="block text-[10px] font-medium uppercase tracking-wider mb-1">First Name</label>
            <input type="text" id="first_name" required
              className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent"></input>
          </div>
          <div className="flex items-center justify-between gap-4">
            <label for="last_name" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Last Name</label>
            <input type="text" id="last_name" required
              className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent"></input>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label for="subject" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Subject</label>
            <select id="subject" className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent">
              <option value="">-</option>
              <option value="online_store_purchase">Online Store Purchase</option>
              <option value="retail_store_purchase">Retail Store Purchase</option>
              <option value="shipping_information">Shipping</option>
              <option value="payment_information">Payment</option>
              <option value="refund_and_return">Refund and Return</option>
              <option value="product_information">Product Information</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4" >
            <label for="description" className="block text-[10px] font-medium uppercase tracking-wider mb-1">Description</label>
            <textarea id="description" rows="4" required
              className="w-[75%] border-0 border-b border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black px-1 py-1 bg-transparent h-[4vh]"></textarea>
          </div>

          <div>
            <div
              className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-sm text-gray-600">
                  Drag & drop files here or{' '}
                  <span className="text-black underline">browse</span>
                </p>
                <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
              </div>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  // Opcional: manejar archivos seleccionados
                  console.log(e.target.files);
                }}
              />
            </div>
          </div>


          <div className="pt-4">
            <button type="submit"
              className="w-full bg-black text-white py-3 px-4 uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors duration-200">
              Submit
            </button>
          </div>
        </form>

        {/* Botón Call Us */}
        <div className="flex flex-col">
          {/* Contenido principal */}
          <div className="mt-12 pt-6 border-t border-dashed border-gray-300">
            <h2 className="text-lg font-medium uppercase tracking-wider mb-4">
              Would you like to contact us?
            </h2>

            <div className="flex flex-row items-center gap-4"> {/* Contenedor flex para ambos botones */}
              {/* Botón Call Us */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className={`flex w-full sm:w-auto items-center border border-black ${showModal ? "bg-gray-50" : "bg-black text-white"} py-3 px-4 text-center uppercase tracking-wider font-medium hover:bg-gray-50 hover:text-black transition-colors duration-200 group`}
                >
                  <img
                    src="../../public/img/icons8-telefono-50.png"
                    alt="Teléfono"
                    className={`w-[20%] mr-3 ${showModal ? "" : "invert"} group-hover:invert-0 transition-all duration-200`}
                  />
                  Call Us
                </button>
              </div>

              {/* Botón Chat - Visible SOLO en móvil */}
              <button
                onClick={() => navigate("/chatBot")}
                className="sm:hidden border-2 border-gray-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                title="Abrir chat"
              >
                <img
                  src="../../public/img/icons8-chat-50.png"
                  alt="Ícono de chat"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
        
        </div>
        <div className="hidden sm:block sticky bottom-6 right-6 z-50 ">
            <button
              onClick={() => navigate("/chatBot")}
              className="border-2 border-gray-500 absolute bottom-6 right-[-50%] z-50 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
              title="Abrir chat"
            >
              <img
                src="../../public/img/icons8-chat-50.png"
                alt="Ícono de chat"
                width="30"
                height="30"
              />
            </button>
          </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 max-w-sm w-[90%]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium uppercase">Call Us</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-black">
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                <p className="font-medium">
                  TEL: <a href="tel:+390289730679" className="hover:underline">+390289730679</a>
                </p>
                <p className="text-sm text-gray-600">Opening Hours: From Monday to Friday, from 10 am to 7 pm CET</p>
                <p className="text-sm text-gray-600">Opening Hours USA: From Monday to Friday, from 9 am to 6 pm EST</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Contact