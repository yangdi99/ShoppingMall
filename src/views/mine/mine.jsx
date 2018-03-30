import React,{ Component } from 'react';
import './mine.css'
class Mine extends Component{
    toSetting () {
        let {history} = this.props;
        history.push('/setting')
    }
    render () {
        return (
            <div className='mine'>
                <header className='headers'>
                    <p>
                        <span className='iconfont icon-shezhi' onClick={this.toSetting.bind(this)}></span>
                        <span className='mines'>我的717商城</span>
                    </p>
                    <dl>
                        <dt><img src={require('../../static/img/mine/tx.png')}/></dt>
                        <dd>user name</dd>
                    </dl>
                </header>
                <div className='mine-wddp'>
                    <p className='p'>
                        <span>
                            <i className='iconfont icon-shop'></i>
                            <span>我的店铺</span>
                        </span>
                        <span>
                            <i className='iconfont icon-right'></i>
                        </span>
                    </p>
                    <div className='mine-list'>
                        <dl>
                            <dt><span className='iconfont icon-daifukuan01'></span></dt>
                            <dd>待付款</dd>
                        </dl>
                        <dl>
                            <dt><span className='iconfont icon-icon2'></span></dt>
                            <dd>待发货</dd>
                        </dl>
                        <dl>
                            <dt><span className='iconfont icon-daishouhuo'></span></dt>
                            <dd>待收货</dd>
                        </dl>
                        <dl>
                            <dt><span className='iconfont icon-tuikuanshouhou'></span></dt>
                            <dd>售后</dd>
                        </dl>
                        <dl>
                            <dt><span className='iconfont icon-gerenzhongxinwodedingdan'></span></dt>
                            <dd>我的订单</dd>
                        </dl>
                    </div>
                </div>
                <div className='mine-lists'>
                    <p>
                        <span className='spans'>
                            <i className='iconfont icon-icon-test'></i>
                            <span>我的社区</span>
                        </span>
                        <span className='spn'>
                            <i className='iconfont icon-right'></i>
                        </span>
                    </p>
                    <p>
                        <span className='spans'>
                            <i className='iconfont icon-daifukuan'></i>
                            <span>账户余额</span>
                        </span>
                        <span className='spn'>
                            <i className='iconfont icon-right'></i>
                        </span>
                    </p>
                    <p>
                        <span className='spans'>
                            <i className='iconfont icon-dizhi-01'></i>
                            <span>地址管理</span>
                        </span>
                        <span className='spn'>
                            <i className='iconfont icon-right'></i>
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}
export default Mine