import React,{ Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './state.js';
import mapDispatchToProps from './dispatch.js';
import './cart.css';
import CartItem from '../../components/cartItem/cartItem.jsx';
class Cart extends Component{
    constructor () {
        super()
        this.state = {
            str: 'all',
            edit: '编辑',
            pay: '结算'
        }
    }
    cartEdit () {
        this.setState({
            edit: this.state.edit == '编辑' ? '完成' : '编辑',
            pay: this.state.edit == '编辑' ? '删除' : '结算'
        })
    }
    toDelGoods () {
        if(this.state.pay == '结算') return;
        let selectedID = [];
        this.props.cartList.forEach((item, index) => {
            if(item.selected == 1){
                selectedID.push(item.goods_id)
            }
        })
        this.props.delCartGoods(selectedID)
    }
    render(){
        let { str,edit,pay } = this.state;
        let { cartList,totalCost,selectAll,selectedAll } = this.props;
        return (
            <div className='cart'>
                <header className='cart-headers'>
                    <div className='headers-shop'>购物车</div>
                    <div className='headers-bj' onClick={this.cartEdit.bind(this)}>{edit}</div>
                </header>
                <div className='goods-list'>
                    <ul>{
                        cartList.map((item, index) => {
                            return <CartItem item={item}  key={index}/>
                        })}
                    </ul>
                </div>
                <footer className='footers'>
                    <div className='icon' onClick={()=>{
                        this.setState({
                            str: str == 'all' ? 'notAll' : 'all'
                        })
                        selectedAll(str)
                    }}>
                        <span className={'select-btn iconfont ' + (selectAll?'icon-duihao':'')}></span>
                        <span>全选</span>
                    </div>
                    <div className='rights'>
                        合计：<span>&yen;{totalCost}</span>
                        <button onClick={this.toDelGoods.bind(this)}>{pay}</button>
                    </div>
                </footer>
            </div>
        )
    }
    componentDidMount () {
        this.props.fetchGoodsList(this.props.history)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)