import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const PlantSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch('/SliderData.json')
      .then(res => res.json())
      .then(data => setSlides(data))
      .catch(err => console.error('Error loading slider data:', err));
  }, []);

  return (
    <div className="py-10 mt-1 px-4 bg-gradient-to-b from-green-50 via-green-100 to-green-200">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map(slide => (
          <SwiperSlide
            key={slide.id}
            className="w-72 md:w-96 lg:w-[500px] xl:w-[550px] rounded-3xl shadow-xl overflow-hidden border-2 border-green-700 bg-white"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-56 md:h-64 lg:h-80 xl:h-96 object-cover"
            />
            <div className="p-5 lg:p-6 text-center bg-green-100">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-900">{slide.title}</h3>
              <p className="text-sm md:text-base text-green-800 mt-2 font-medium">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlantSlider;
