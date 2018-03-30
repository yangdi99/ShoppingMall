import React,{ Component } from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
let img1 = require('../../static/img/1.png');
let img2 = require('../../static/img/2.png');
let img3 = require('../../static/img/3.png');
let img4 = require('../../static/img/4.png');
class SwiperComponent extends Component{
    render () {
        return (
            <div className="swiper-container" ref="scDom">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={img1} alt=""/></div>
                    <div className="swiper-slide"><img src={img2} alt=""/></div>
                    <div className="swiper-slide"><img src={img3} alt=""/></div>
                    <div className="swiper-slide"><img src={img4} alt=""/></div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        new Swiper(this.refs.scDom, {
            autoplay: true,
            loop: true
        })
    }
}
export default SwiperComponent