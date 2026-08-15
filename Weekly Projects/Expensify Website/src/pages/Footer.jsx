import React from 'react'

const Footer = ({dark}) => {
    return (
        <div className={`w-full h-[135vh] relative overflow-y-hidden ${dark ? "bg-[#061B09]" : "text-white"}`}>
            <div className='w-[92%] h-[75vh] flex gap-33 text-white/90 justify-center pt-17'>
                <ul className={`inter flex flex-col gap-3 ${dark ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                    <li className='text-[#03C041] text-lg font-semibold'>Features</li>
                    <a href=""><li>Expense Management</li></a>
                    <a href=""><li>Spend Management</li></a>
                    <a href=""><li>Expense Reports</li></a>
                    <a href=""><li>Company Credit Card</li></a>
                    <a href=""><li>Receipt Scanning App</li></a>
                    <a href=""><li>Bill Pay</li></a>
                    <a href=""><li>Invoicing</li></a>
                    <a href=""><li>Payroll</li></a>
                    <a href=""><li>Travel</li></a>
                </ul>

                <ul className={`inter flex flex-col gap-3 ${dark ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                    <li className='text-[#03C041] text-lg font-semibold'>Resources</li>
                    <a href=""><li>ExpensifyApproved!</li></a>
                    <a href=""><li>Press Kit</li></a>
                    <a href=""><li>Support</li></a>
                    <a href=""><li>ExpensifyHelp</li></a>
                    <a href=""><li>Terms of Service</li></a>
                    <a href=""><li>Privacy</li></a>
                </ul>

                <ul className={`inter flex flex-col gap-3 ${dark ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                    <li className='text-[#03C041] text-lg font-semibold'>Learn More</li>
                    <a href=""><li>About Expensify</li></a>
                    <a href=""><li>Blog</li></a>
                    <a href=""><li>Jobs</li></a>
                    <a href=""><li>Expensifying</li></a>
                    <a href=""><li>Investor Relations</li></a>
                </ul>

               <ul className={`inter flex flex-col gap-3 ${dark ? "text-white" : "text-gray-700 hover:text-gray-900"}`}>
                    <li className='text-[#03C041] text-lg font-semibold'>Get Started </li>
                    <a href=""><li>Create a new account</li></a>
                    <a href=""><li>Log in</li></a>
                    <a href=""><li>@2008-2026 Expensify, Inc.</li></a>
                </ul>
            </div>

            <div className={`w-full h-[25vh] pr-15 pl-15 text-xs pt-4 ${dark ? "text-white/90" : "text-gray-500"}`}>
                <p>The Expensify Visa® Commercial Card is issued by The Bancorp Bank, N.A. pursuant to a license from Visa U.S.A. Inc. and may not be used at all merchants that accept Visa cards. Apple® and the Apple logo® are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</p><br />
                <p>Cards provided to EEA residents are issued by Transact Payments Malta Limited and cards provided to UK residents are issued by Transact Payments Limited pursuant to license by Visa Europe Limited. Transact Payments Malta Limited is duly authorized and regulated by the Malta Financial Services Authority as a Financial Institution under the Financial Institution Act 1994. Registration number C 91879. Transact Payments Limited is authorized and regulated by the Gibraltar Financial Service Commission.</p><br />
                <p>Money transmission services are provided by our partners, which includes Expensify Payments LLC (NMLS ID: 2017010), pursuant to its <span className='text-blue-500'>licenses</span>. See the <span className='text-blue-500'>Terms of Service</span> for more information.

                </p>
            </div>
                <p className='text-[#03D47C] text-[215px] font-extrabold inter absolute top-163 left-10'>Expensify</p>
            
        </div>
    )
}

export default Footer
