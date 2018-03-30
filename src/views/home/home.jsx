import React,{ Component } from 'react';
import "./home.css"
import $http from "../../utils/http";
import SwiperComponent from '../../components/swiper/swipercomp';
import GoodsItem from '../../components/goodsComp/goodsComponent';
let img1 = require('../../static/img/navlist/nav1.png');
let img2 = require('../../static/img/navlist/nav2.png');
let img3 = require('../../static/img/navlist/nav3.png');
let img4 = require('../../static/img/navlist/nav4.png');
let img5 = require('../../static/img/navlist/nav5.png');
let img6 = require('../../static/img/navlist/nav6.png');
let img7 = require('../../static/img/navlist/nav7.png');
let img8 = require('../../static/img/navlist/nav8.png');
class Home extends Component{
    constructor () {
        super();
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
    }
    componentDidMount(){
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            let data = JSON.parse(res).data.data;
            this.setState({
                "goodslist": data
            })
        })
    }
    toSearch () {
        let { history } =this.props;
        history.push('search')
    }
    scrolling () {
        if(this.state.channel_id > 9) return;
        if(!this.state.caniquery) return;
        let { scroller,doc } = this.refs;
        let st = scroller.scrollTop;
        let sw = scroller.offsetHeight;
        let dh = doc.offsetHeight;
        if( dh - (st + sw) < 50 ){
            this.setState({
                caniquery: false
            })
            this.setState({
                channel_id: ++this.state.channel_id
            })
            let { goodslist } = this.state;
            console.log(goodslist)
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
                let data = JSON.parse(res).data.data;
                this.setState({
                    goodslist: [...goodslist,...data]
                })
                this.setState({
                    caniquery: true
                })
            })
        }
    }
    render(){
        return (
            <div className='home' ref='scroller'  onScroll={this.scrolling.bind(this)}>
                <div ref='doc'>
                    <header className="header">
                        <div className="shopcarts">
                            <span>717</span>
                        </div>
                        <div className="input">
                            <span className='iconfont icon-search'></span>
                            <input type="text" placeholder='请输入您要购买的商品' onFocus={this.toSearch.bind(this)}/>
                        </div>
                        <div className="shop">
                            <span className="iconfont icon-shop"></span>
                            <span>我的店铺</span>
                        </div>
                    </header>
                    <div className='banner'>
                        <SwiperComponent></SwiperComponent>
                    </div>
                    <section>
                        <div className="nav">
                            <div className='nav-list'>
                                <dl>
                                    <dt>
                                        <img src={img1} alt=""/>
                                    </dt>
                                    <dd>家乡味道</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img2} alt=""/>
                                    </dt>
                                    <dd>进口食品</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img3} alt=""/>
                                    </dt>
                                    <dd>牛奶乳品</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img4} alt=""/>
                                    </dt>
                                    <dd>休闲零食</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img5} alt=""/>
                                    </dt>
                                    <dd>生鲜果蔬</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img6} alt=""/>
                                    </dt>
                                    <dd>米面粮油</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img7} alt=""/>
                                    </dt>
                                    <dd>调味调料</dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <img src={img8} alt=""/>
                                    </dt>
                                    <dd>酒水饮料</dd>
                                </dl>
                            </div>
                            <div className="nav-state">
                                <div>商城动态</div>
                                <div>717安全食品商城周年庆，暑假放价嗨不停！</div>
                            </div>
                        </div>
                    </section>
                    <div className="goods-list">
                        {
                            this.state.goodslist.map((item,index)=>{
                                return <GoodsItem data={item} key={index} history={this.props.history} location={this.props.location}></GoodsItem>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Home