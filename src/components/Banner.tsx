'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner () {

    return (

        <div className="w-100 h-[80vh]">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30} // Adjust spacing between slides
                slidesPerView={1} // Show one slide at a time
                autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto slide every 3 sec
                pagination={{ clickable: true }} // Dots navigation
                navigation // Prev/Next buttons
                loop // Infinite looping
                className="w-full"
                >

                <SwiperSlide><img src="/img/temp_pic_1.png" alt="Slide 1" /></SwiperSlide>
                <SwiperSlide><img src="/img/temp_pic_2.png" alt="Slide 2" /></SwiperSlide>
                {/* <SwiperSlide><img src="/img/cover3.jpg" alt="Slide 3" /></SwiperSlide>
                <SwiperSlide><img src="/img/cover4.jpg" alt="Slide 4" /></SwiperSlide> */}

            </Swiper>
        </div>
    );
}