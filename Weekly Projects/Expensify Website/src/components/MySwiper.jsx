import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Swipercards from './Swipercards';

const MySwiper = () => {
  return (
    <div className='h-110'>
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      className="h-full"
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className='heroCard flex justify-center items-center bg-cover bg-center rounded-2xl'><Swipercards logo= "N O R T H W E L L" para = "Rolled out" span = "company-wide card, travel, and expense"/></SwiperSlide>

      <SwiperSlide className='heroCard1 flex justify-center items-center bg-cover bg-center rounded-2xl'><Swipercards logo= "◆ MERIDIAN" para = "Achieved 50% faster than others" span = "client reimbursements"/></SwiperSlide>

      <SwiperSlide className='heroCard2 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "⟡ GLASSPOINT" para = "Funded their entire program" span = "with Expensify Card"/></SwiperSlide>

      <SwiperSlide className='heroCard3 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "V E R I D I A N" para = "Automated 100%" span = "of NetSuite entries in the market"/></SwiperSlide>

      <SwiperSlide className='heroCard4 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "CASCADE health" para = "Simplified management with" span = "24/7 support"/></SwiperSlide>

      <SwiperSlide className='heroCard5 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "✦ NOVASTRA" para = "Saved ~45 accounting hours" span = "per month"/></SwiperSlide>

      <SwiperSlide className='heroCard6 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "A T L A S F O R G E" para = "Cut travel spend" span = "by 30% thus surpassing the competitors"/></SwiperSlide>
      
      <SwiperSlide className='heroCard7 flex justify-center items-center bg-cover bg-center rounded-2xl bg-white'><Swipercards logo= "⬡ HEXFRAME" para = "Reduced corporate card reconciliation" span = "time by 90%"/></SwiperSlide>
      ...
    </Swiper>
    </div>
  )
}

export default MySwiper;
