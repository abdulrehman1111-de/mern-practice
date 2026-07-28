import React from 'react'
import Card from '../components/Card'
import Greenbtn from '../components/Greenbtn'
import { FaStar } from "react-icons/fa";
import g2Logo from '../assets/g2-logo.svg'
import Googlebtn from '../components/Googlebtn';

const Home = () => {
    return (
        <>
        <div className='bg-[#0B2E1F] text-white h-[130vh] relative pl-10 pt-5'>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 680 400" preserveAspectRatio="xMidYMid slice">
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

            <div className='relative border-1 border-white h-[127vh] flex'>
                <div className='border-1 border-white h-[125vh] w-[60%] flex flex-col gap-10'>
                    <p className='text-3xl font-bold inter'>Expensify</p>
                    <p className='text-6xl fraunces w-[83%]'>The <span className='text-[#2FE38A]'><i>easiest</i></span> way to do your expenses</p>

                    <ul className='flex flex-col gap-4 w-[80%]'>
                        <li><b>✓  </b><b>All inclusive.</b> AI-powered expenses, travel, reimbursements, and corporate cards.</li>
                        <li><b>✓  </b><b>Bring your own cards (BYOC).</b> You don't have to switch corporate cards to use Expensify.</li>
                        <li><b>✓  </b><b>45+ integrations.</b> QuickBooks, NetSuite, Sage Intacct, Xero, Workday, Gusto, and so much more.</li>
                    </ul>

                    <div className='border-1 border-white w-full h-40 flex flex-col gap-3'>
                        <p className='font-bold'>I want to:</p>
                        <div className='flex gap-3'>
                            <Card title="Organize my own expenses" />
                            <Card title="Manage expenses for 1-9 employees" />
                            <Card title="Manage expenses for 10+ employees" />
                        </div>
                    </div>

                    <div className='bg-white w-[90%] h-15 flex justify-center items-center rounded-4xl'>
                        <p className='text-gray-600 ml-5'>Enter your Email or Phone number</p>
                        <div className='bg-[#2FE38A] ml-auto mr-1 w-[40%] h-13 rounded-4xl flex justify-center items-center text-center'>
                            <p className='font-semibold'>Get started for free</p>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center relative bottom-3'>
                        <span>Or get started with</span>
                        <Googlebtn />
                    </div>
                </div>
                <div className='border-1 border-white h-[130vh] w-[50%] flex flex-col space-y-18'>
                    <Greenbtn />

                    <div className='flex gap-2 border-1 border-white w-auto pr-10'>
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
        <div className='w-full h-40 bg-green-500'>
        </div>
        </>
    )
}

export default Home
