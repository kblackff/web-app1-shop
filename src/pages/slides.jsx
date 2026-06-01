import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide} from 'swiper/react'
import { 
    Autoplay, 
    EffectCube, 
    EffectFade, 
    Mousewheel, 
    Navigation, 
    Pagination,
    Thumbs 
} from 'swiper/modules'
import { Img, Img2, Img3, Img4, Img5, Img22, Img23, Img24, Img25,
    Img45, Img46, Img47, Img48, Img55, Img56, Img57, Img58, Img59,
    Img67, Img68, Img69, Img82, Img83, Img84, Img85, Img86,  
} from '../assets/images'

import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/effect-cube'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import './slides.css'

function IMG({src, alt, id}) {
    const [thumbSwiper, setThumbSwiper] = useState(null)
    
    useEffect(() => {
        const init = document.querySelectorAll('.swipernull')
        const prev = document.querySelectorAll('.swiper-button-prev')
        const next = document.querySelectorAll('.swiper-button-next')

        init.forEach(ld => {
            for(let pval of prev){
                for(let nval of next){
            ld.addEventListener('mouseenter', function() {
                pval.style.opacity=1            
                nval.style.opacity=1    
            })
            ld.addEventListener('mouseleave', function() {
                pval.style.opacity=0.2
                nval.style.opacity=0.2
            })
        }}
        })
    })

    switch(id) {
        case id=3:
            return (
                <>
                <Swiper 
                  modules={[Navigation, Pagination, Mousewheel, EffectFade]}
                  style={{ 
                    '--swiper-pagination-color': '#0b0c14cc',
                    '--swiper-navigation-color': '#0b0c14cc',
                    '--swiper-navigation-size': '24px',
                    '--swiper-pagination-progressbar-size': '2px'
                  }}
                  navigation={true}
                  pagination={{ type: 'progressbar' }}
                  effect='fade'
                  loop={true}
                  className='swipernull'
                >
                    
                    <SwiperSlide>
                        <img src={Img25} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Img24} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide><img src={Img23} alt={alt} className='img22' /></SwiperSlide>                
                </Swiper>
                </>
            )
            break
        case id=4:
            return (
                <>
                <Swiper 
                  modules={[Navigation, Pagination, EffectFade]}
                  style={{ 
                    '--swiper-pagination-color': '#0b0c14cc',
                    '--swiper-navigation-color': '#0b0c14cc',
                    '--swiper-navigation-size': '24px',
                    '--swiper-pagination-progressbar-size': '2px'
                  }}
                  navigation={true}
                  pagination={{ type: 'progressbar' }}
                  effect='fade'
                  loop={true}
                  className='swipernull'
                >
                    <SwiperSlide>
                        <img src={Img82} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Img84} alt={alt} className='img22' loading='lazy' />
                       <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide><img src={Img83} alt={alt} className='img22' /></SwiperSlide>
                    <SwiperSlide><img src={Img84} alt={alt} className='img22' /></SwiperSlide>
                    <SwiperSlide><img src={Img86} alt={alt} className='img22' /></SwiperSlide>                
                </Swiper>
                </>
            )
            break
        case id=5:
            return (
                <>
                <Swiper 
                  modules={[Navigation, Pagination, EffectFade]}
                  style={{ 
                    '--swiper-pagination-color': '#0b0c14cc',
                    '--swiper-navigation-color': '#0b0c14cc',
                    '--swiper-navigation-size': '24px',
                    '--swiper-pagination-progressbar-size': '2px'
                  }}
                  navigation={true}
                  pagination={{ type: 'progressbar' }}
                  effect='fade'
                  loop={true}
                  className='swipernull'
                >
                    <SwiperSlide>
                        <img src={Img47} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Img48} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide><img src={Img45} alt={alt} className='img22' /></SwiperSlide>
                    <SwiperSlide><img src={Img46} alt={alt} className='img22' /></SwiperSlide>              
                </Swiper>
                </>
            )
            break
        case id=6:
            return (
                <>
                <Swiper 
                  modules={[Navigation, Pagination, EffectFade]}
                  style={{ 
                    '--swiper-pagination-color': '#0b0c14cc',
                    '--swiper-navigation-color': '#0b0c14cc',
                    '--swiper-navigation-size': '24px',
                    '--swiper-pagination-progressbar-size': '2px'
                  }}
                  navigation={true}
                  pagination={{ type: 'progressbar' }}
                  effect='fade'
                  loop={true}
                  className='swipernull'
                >
                    <SwiperSlide>
                        <img src={Img58} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Img56} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide><img src={Img59} alt={alt} className='img22' /></SwiperSlide>
                    <SwiperSlide><img src={Img55} alt={alt} className='img22' /></SwiperSlide>
                    <SwiperSlide><img src={Img57} alt={alt} className='img22' /></SwiperSlide>               
                </Swiper>
                </>
            )
            break
        case id=7:
            return (
                <>
                <Swiper 
                  modules={[Navigation, Pagination, EffectFade]}
                  style={{ 
                    '--swiper-pagination-color': '#0b0c14cc',
                    '--swiper-navigation-color': '#0b0c14cc',
                    '--swiper-navigation-size': '24px',
                    '--swiper-pagination-progressbar-size': '2px'
                  }}
                  navigation={true}
                  pagination={{ type: 'progressbar' }}
                  effect='fade'
                  loop={true}
                  className='swipernull'
                >
                    <SwiperSlide>
                        <img src={Img67} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={Img68} alt={alt} className='img22' loading='lazy' />
                        <div className='swiper-lazy-preloader 
                        swiper-lazy-preloader-white'></div>
                    </SwiperSlide>
                    <SwiperSlide><img src={Img69} alt={alt} className='img22' /></SwiperSlide>                
                </Swiper>
                </>
            )
            break
        default:
            return (
                <>
                <Swiper 
                    modules={[Thumbs, EffectCube, Autoplay]} 
                    thumbs={{ swiper: thumbSwiper }}
                    effect='cube'
                    cubeEffect={{ slideShadows: false }}
                    grabCursor={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    className='swiper2th'
                    >
                        <SwiperSlide><img src={Img3} alt={alt} className='img22' /></SwiperSlide>
                        <SwiperSlide><img src={Img2} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img22} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img4} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img5} alt={alt} className='img22' loading='lazy' /></SwiperSlide>           
                </Swiper>
            
                    <Swiper 
                      modules={[Thumbs]} 
                      onSwiper={setThumbSwiper}
                      spaceBetween={10}
                      slidesPerView={3}
                      grabCursor={true}
                      watchSlidesProgress={true}
                      className='swipth'
                    >
                        <SwiperSlide><img src={Img3} alt={alt} className='img22' /></SwiperSlide>
                        <SwiperSlide><img src={Img2} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img22} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img4} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                        <SwiperSlide><img src={Img5} alt={alt} className='img22' loading='lazy' /></SwiperSlide>
                    </Swiper>
                </>
            )
    }
}

export default IMG