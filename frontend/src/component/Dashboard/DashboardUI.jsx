import React from 'react'
import '../Dashboard/DashboardUI.css'
// import log from '../../assets/logo.png'
import home from '../../assets/home.png'
import log from '../../assets/newlogo.png'
export default function DashboardUI() {
    return (
        <>
            <div className="navbar-main">
                <div className='logo-main'>
                    <img className='logo-image' src={log} alt="" srcset="" />
                </div>
                <div >
                    <ul className='list'>
                        <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">What we treat</li>
                        <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">What we do</li>
                        <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">About us</li>
                        <li className='mt-2.5 '><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type='button'> Get Started</button></li>
                        <li className='mt-2.5'><button type='button' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Log In
                        </button></li>
                        <li className='mt-5'><i className="fa-solid fa-moon fa-xl"></i></li>

                    </ul>
                </div>
            </div>


            <div className="homepage">
                <img src={home} alt="" />
            </div>
            <br />
            <br />
            <div className="text">
                <h2>How can we help you today?</h2>
            </div>

            <div className='categories-main'>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-regular fa-newspaper"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Online Prescription</p>
                        <h6>for when your script is run out</h6>
                        <h6>script sent your phone or medication deliverd</h6>
                    </div>
                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5  mt-3 ml-7 border border-gray-400 rounded shadow">
                        Request a Script
                    </button>
                </div>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-solid fa-certificate fa-xl"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Medical certificate</p>
                        <h6>for work,uni,school or carers</h6>
                        <h6>sent to your email in miniutes</h6>
                    </div>
                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5 mt-3 ml-7 border border-gray-400 rounded shadow">
                        Request a Certificate
                    </button>
                </div>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-solid fa-phone"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Telehealth counsultation</p>
                        <h6>for when you need to speak to doctor</h6>
                        <h6>fast advice</h6>
                    </div>
                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5 mt-3 ml-7 border border-gray-400 rounded shadow">
                        Request a Consult
                    </button>
                </div>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-solid fa-file-pen"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Weight loss treatment</p>
                        <h6>for a medical management of weight loss</h6>
                        <h6>treatment option</h6>
                    </div>
                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5 mt-3 ml-7 border border-gray-400 rounded shadow">
                        Request a consult
                    </button>
                </div>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-solid fa-flask-vial"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Blood Test</p>
                        <h6>for pregancy and more</h6>
                        <h6>Refreal send to your mail      </h6>
                    </div>
                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5 mt-3 ml-7 border border-gray-400 rounded shadow">    
                        Request a Test
                    </button>
                </div>

                <div className='box'>
                    <div className='container-icon-link'>
                        <div className='icon'><i class="fa-solid fa-user-doctor"></i></div>
                        <div className="link">Learn more  <i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                    </div>
                    <div className="box-text">
                        <p>Special Referral</p>
                        <h6>for skin ,eyes and more</h6>
                        <h6>Refreal send to your mail</h6>
                    </div>
                    

                    <button className="bg-white w-56 hover:bg-blue-100 text-gray-800 font-semibold py-0.5 mt-3 ml-7 border border-gray-400 rounded shadow">
                        Request a specialist
                    </button>
                    
                </div>



            </div>
        </>
    )
}


//  <li className='mt-5'><i className="fa-solid fa-moon fa-xl"></i></li>


