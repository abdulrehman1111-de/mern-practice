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
      <SwiperSlide className='heroCard flex justify-center items-center bg-cover bg-center text-black'><Swipercards para = "Rolled out" span = "company-wide card, travel, and expense"/></SwiperSlide>
      <SwiperSlide className='heroCard1 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard2 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard3 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard4 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard5 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard6 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      <SwiperSlide className='heroCard7 flex justify-center items-center bg-cover bg-center bg-white'></SwiperSlide>
      ...
    </Swiper>
    </div>
  )
}

export default MySwiper;
