import React,{ Component } from "react";
import $http from '../../utils/http';
import './goodsItem.css';
import Lazyload from 'react-lazyload';
import {getCookie} from '../../utils/utils.js';
import {T} from 'react-toast-mobile';
import { connect } from 'react-redux';
import {ADD_CART } from '../../store/reducers.js'
class Placeholder extends Component {
    render () {
        return <img src={require('../../static/img/navlist/nav1.png')} alt=''/>
    }
}
class GoodsItem extends Component{
    constructor () {
        super()
    }
    addCart (e) {
        e.stopPropagation();
        let {data} = this.props;
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                goods_id: data.goods_id,
                goods_info: data,
                token: getCookie('token')
            })
            .then((res) =>{
                if(res == '1' ){
                    this.props.dispatch({
                        type: ADD_CART,
                        data: {
                            ...data,
                            count: 1,
                            selected: 0
                        }
                    })
                }else{
                    let {history,location} = this.props;
                    this.props.history.push('/login',{
                        from: location.pathname
                    })
                }
            })
        }else{
            let {history,location} = this.props;
            this.props.history.push('/login',{
                from: location.pathname
            })
        }
    }
    toDetail (goods_id) {
        this.props.history.push('/detail',{
            goods_id: goods_id
        })
    }
    render () {
        let { data } = this.props;
        return (
            <div className="goods-item" onClick={()=>{this.toDetail(data.goods_id)}}>
                <dl>
                    <dt><Lazyload overflow once height={'100%'} placeholder={<Placeholder></Placeholder>} debounce={100}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></Lazyload></dt>
                    <dd>
                        <p className="goods-detail">{data.goods_name}</p>
                        <p>
                            <em>￥<span className='goods-price'>{data.discount_price}</span></em>
                            <span className='iconfont icon-gouwuche' onClick={this.addCart.bind(this)}></span>
                        </p>
                    </dd>
                </dl>
            </div>
        )
    }
}
export default connect(null)(GoodsItem)