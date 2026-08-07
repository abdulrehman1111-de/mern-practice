import React, { useEffect } from 'react'
import Card from '../components/Card'
import Greenbtn from '../components/Greenbtn'
import { FaStar } from "react-icons/fa";
import g2Logo from '../assets/g2-logo.svg'
import Googlebtn from '../components/Googlebtn';
import {
    SiGithub, SiPinterest, SiXero, SiQuickbooks, SiSpotify, SiNetflix,
    SiAirbnb,
    SiDropbox,
    SiZoom,
} from "react-icons/si"
import Firstcards from './Firstcards';
import Transparentbtn from '../components/Transparentbtn';
import Darkcards from '../components/Darkcards';
import iconReceiptScanning from '../assets/icon-receipt-scanning.svg'
import iconExpenseReports from '../assets/icon-expense-reports.svg'
import iconAiExpenses from '../assets/icon-ai-expenses.svg'
import Testcards from '../components/Testcards';
import badgeLeader from '../assets/badge-leader.png'
import badgeTopRated from '../assets/badge-top-rated.png'
import badgeShortlist from '../assets/badge-shortlist.png'
import screenshot122404 from '../assets/screenshot-122404.png'
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Signin from '../components/Signin';
import Faq from '../components/Faq';
import Paginationpage from '../components/Paginationpage';

const Home = () => {

    useEffect(() => {
        const signInBtn = document.getElementById("signInBtn");
        const crossBtn = document.getElementById("crossBtn");
        const signInDiv = document.getElementById("signInDiv");
        const homeDiv = document.querySelectorAll(".homeDiv");

        signInBtn.addEventListener("click", () => {
            signInDiv.classList.remove("none");
            homeDiv.forEach((item)=>{
                item.classList.add("grayscale");
            })
            document.body.classList.add("overflow");
        })

        crossBtn.addEventListener("click", () => {
            signInDiv.classList.add("none");
            homeDiv.forEach((item)=>{
                item.classList.remove("grayscale");
            })
            document.body.classList.remove("overflow");
        })
    }, [])



    return (
        <>
            <div className='bg-[#0B2E1F] text-white h-[130vh] relative pl-10 pt-5'>

                <div><Signin /></div>
                <svg className="homeDiv absolute homeDiv inset-0 w-full h-full" viewBox="0 0 680 400" preserveAspectRatio="xMidYMid slice">
                    <g fill="none" stroke="#15402C" strokeWidth="1.5">
                        <path d="M -20 60 C 100 20, 200 100, 320 60 S 560 20, 700 70" />
                        <path d="M -20 90 C 100 50, 200 130, 320 90 S 560 50, 700 100" />
                        <path d="M -20 120 C 100 80, 200 160, 320 120 S 560 80, 700 130" />
                        <path d="M -20 180 C 120 130, 220 220, 340 180 S 580 130, 700 190" />
                        <path d="M -20 210 C 120 160, 220 250, 340 210 S 580 160, 700 220" />
                        <path d="M -20 240 C 120 190, 220 280, 340 240 S 580 190, 700 250" />
                        <path d="M -20 300 C 140 260, 240 340, 360 300 S 600 260, 700 310" />
                        <path d="M -20 330 C 140 290, 240 370, 360 330 S 600 290, 700 340" />
                    </g>
                </svg>

                <div className='homeDiv relative h-[127vh] flex'>
                    <div className='homeDiv h-[127vh] w-[60%] flex flex-col gap-10'>
                        <p className='text-3xl font-bold inter'>Expensify</p>
                        <p className='text-6xl fraunces w-[83%]'>The <span className='text-[#2FE38A]'><i>easiest</i></span> way to do your expenses</p>

                        <ul className='flex flex-col gap-4 w-[80%]'>
                            <li><b>✓  </b><b>All inclusive.</b> AI-powered expenses, travel, reimbursements, and corporate cards.</li>
                            <li><b>✓  </b><b>Bring your own cards (BYOC).</b> You don't have to switch corporate cards to use Expensify.</li>
                            <li><b>✓  </b><b>45+ integrations.</b> QuickBooks, NetSuite, Sage Intacct, Xero, Workday, Gusto, and so much more.</li>
                        </ul>

                        <div className='w-full h-40 flex flex-col gap-3'>
                            <p className='font-bold'>I want to:</p>
                            <div className='flex gap-3'>
                                <Card title="Organize my own expenses" />
                                <Card title="Manage expenses for 1-9 employees" />
                                <Card title="Manage expenses for 10+ employees" />
                            </div>
                        </div>

                        <div className='bg-white w-[90%] h-15 flex justify-center items-center rounded-4xl'>
                            <input className='w-full h-full rounded-full pl-5 text-gray-600' type="text" name="" id="" placeholder='Enter your email or phone number' />
                            <div className='bg-[#2FE38A] hover:bg-green-400 z-100 ml-auto mr-1 w-[40%] h-13 rounded-4xl flex justify-center items-center text-center'>
                                <p className='font-semibold'>Get started for free</p>
                            </div>
                        </div>

                        <div className='flex gap-3 items-center relative bottom-3'>
                            <span>Or get started with</span>
                            <Googlebtn />
                        </div>
                    </div>
                    <div className='homeDiv h-[130vh] w-[50%] flex flex-col space-y-18'>

                        <div id='signInBtn'>
                            <Greenbtn />
                        </div>

                        <div className='flex gap-2 w-auto pr-10'>
                            <img src={g2Logo} alt="G2" className="w-8 h-8 relative bottom-1 ml-auto" />
                            <div className="flex text-yellow-400 relative top-1 text-xl">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <p className='translate-y-0.5'>4,200+ <b>5-star</b> reviews</p>
                        </div>
                        <div className='bg-[url(https://d2k5nsl2zxldvw.cloudfront.net/images/homepage/2024/hero_screenshot_f1.png)] w-full h-[72.5%] bg-cover '>
                        </div>
                    </div>
                </div>
            </div>
            <div className='homeDiv w-full h-40 bg-green-900 flex-nowrap overflow-hidden justify-start'>
                <div className='w-full h-17 flex justify-center items-end text-center fraunces'>
                    <p className='text-2xl text-white'>Join 15 million+ members who trust Expensify</p>
                </div>
                <div className='firstReel w-full h-23 text-nowrap flex gap-30 shrink-0 justify-center items-center'>

                    <div className='flex gap-1'><p className='text-white text-2xl'>Github</p><SiGithub size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Pintrest</p><SiPinterest size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Xero</p><SiXero size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Quickbooks</p><SiQuickbooks size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Spotify</p><SiSpotify size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Netflix</p><SiNetflix size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Airbnb</p><SiAirbnb size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Dropbox</p><SiDropbox size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Zoom</p><SiZoom size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Github</p><SiGithub size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Pintrest</p><SiPinterest size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Xero</p><SiXero size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Quickbooks</p><SiQuickbooks size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Spotify</p><SiSpotify size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Netflix</p><SiNetflix size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Airbnb</p><SiAirbnb size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Dropbox</p><SiDropbox size={32} color="white" /></div>
                    <div className='flex gap-1'><p className='text-white text-2xl'>Zoom</p><SiZoom size={32} color="white" /></div>
                </div>
            </div>

            <Firstcards />

            <Paginationpage/>

            <div className='w-full h-[100vh] bg-[#1A3D32] pr-30 pl-30'>
                <div className='w-full h-[25vh] flex justify-center items-center text-white'>
                    <p className='text-4xl fraunces font-semibold'>Highly rated, easy to use</p>
                </div>

                <div className='w-full h-[55vh] flex justify-center items-center gap-7'>
                    <Testcards title="“The easiest expense tool I've ever used.”" desc="“It is very very easy, as soon as you get a receipt you can scan it, the AI will capture all relevant information and it is very little interaction to get to the final sumbmission.”" name="Luis F." icon="https://i.pinimg.com/originals/e3/7e/0e/e37e0e25686c2139b281a57a5b4906f2.jpg" />
                    <Testcards title="“Great Program!”" desc="“Expensify has a great UI interface and is very intuitive to use. I particularly like the funcitonality of taking a picture of a receipt and having it uploaded to my account. I also like that I can send an email.”" name="Kirsten H." icon="https://i.pinimg.com/originals/f4/9d/58/f49d58b8c6a678be1e4ff288b98cc75b.jpg" />
                    <Testcards title="“Simple, Straight-forward Expenses!”" desc="“I've never met someone that enjoys doing their expenses. Following business trips or in the office, take time out of their day/week to sort through, and enter receipts." name="Weston M." icon="https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" />
                </div>

                <div className='w-full h-20 flex justify-around items-center pl-15 pr-15 text-white pt-15'>
                    <div className='flex gap-2 w-auto pr-10 mr-auto'>
                        <img src={g2Logo} alt="G2" className="w-8 h-8 relative bottom-1 ml-auto" />
                        <div className="flex text-yellow-400 relative top-1 text-xl">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p className='translate-y-0.5'>4,200+ <b>5-star</b> reviews</p>
                    </div>
                    <div className='flex gap-8 ml-auto'>
                        <img src={badgeShortlist} alt="Leader award 2025" className="w-18 h-auto" />
                        <img src={badgeLeader} alt="Leader award 2025" className="w-18 h-auto" />
                        <img src={badgeTopRated} alt="Leader award 2025" className="w-18 h-auto" />
                    </div>
                </div>
            </div>

            <div className='w-full h-[80vh]'>
                <img className='w-full' src={screenshot122404} alt="" />
            </div>

            <Faq/>

            <div className='w-full h-[55vh] bg-[#1A3D32] flex justify-center items-center'>
                <div className='w-[50%] h-[50vh] pl-15 pr-15 text-white flex flex-col gap-5 justify-center items-center'>
                    <p className='fraunces text-4xl'>Ready to simplify your receipt and expense management process?</p>
                    <p className='fraunces'>Enter your email or phone number to make your company's money go further with Expensify's time-saving spend management tools.</p>
                </div>
                <div className='w-[50%] h-[50vh] flex justify-center items-center gap-13 flex-col pl-10 pr-10'>
                    <div className='bg-white w-[90%] h-15 flex justify-center items-center rounded-4xl'>
                        <input className='w-[95%] h-full rounded-full pl-5 text-gray-600' type="text" name="" id="" placeholder='Enter your email or phone number' />
                        <div className='bg-[#2FE38A] text-white hover:bg-green-400 z-100 ml-auto mr-1 w-[45%] h-13 rounded-4xl flex justify-center items-center text-center'>
                            <p className='font-semibold'>Get started for free</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center relative bottom-3 mr-auto relative left-8'>
                        <span className='text-white'>Or get started with</span>
                        <Googlebtn />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home
