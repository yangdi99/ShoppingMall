import React, { Component } from 'react'
import { connect } from 'react-redux';
import mapDispatchToProps from './dispatch';
class CartItem extends Component{
    constructor () {
        super()
    }
    render () {
        let { toggleSelect,updateCount,item } = this.props;
        return (
            <li>
                <div className='inputs'>
                    <div className='icon'>
                        <span onClick={() => {toggleSelect((1-item.selected),item.goods_id)}} className={item.selected == 0 ? 'select-btn iconfont' : ' select-btn iconfont icon-duihao'}></span>
                    </div>
                    <span className='imgs'>
                        <img src={'http://www.lb717.com' + item.obj_data} alt=''/>
                    </span>
                </div>
                <div className='cart-contents'>
                    <p className='cart-cont'>{item.goods_name}</p>
                    <div className='cart-cnts'>
                        <div className='cart-price'>
                            <p className='cart-count'>x{item.count}</p>
                            <p className='cart-prices'><span>&yen;</span>{item.discount_price}</p>
                        </div>
                        <div className='cart-counts'>
                            <span onClick={() => { updateCount(--item.count,item.goods_id) }}>-</span>
                            <span className='counts'>{item.count}</span>
                            <span onClick={() => { updateCount(++item.count,item.goods_id) }}>+</span>
                        </div>
                    </div>

                </div>
            </li>
        )

    }
}
export default connect(null, mapDispatchToProps,null,{pure:false})(CartItem)