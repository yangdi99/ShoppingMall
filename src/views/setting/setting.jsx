import React,{ Component } from 'react';
import './setting.css'
import {loginout} from '../../utils/utils'
class Setting extends Component{
    back () {
        let { history } = this.props;
        history.go(-1)
    }
    loginout () {
        let { history } = this.props;
        loginout();
        history.push('/index/home')
    }
    render () {
        return (
            <div className='setting'>
                <div className='headers'>
                    <div className='back' onClick={this.back.bind(this)}><span className='iconfont icon-xiangzuo'></span></div>
                    <div className='sets'>设置</div>
                    <div></div>
                </div>
                <section className='sections'>
                    <div className='content-setting'>
                        <p>
                            <span>我的头像</span>
                            <span>
                                <img src={require('../../static/img/mine/tx.png')}/>
                                <i className='iconfont icon-right'></i>
                            </span>
                        </p>
                        <p>
                            <span>用户名</span>
                            <span>
                                <span>user name</span>
                                <i className='iconfont icon-right'></i>
                            </span>
                        </p>
                        <p>
                            <span>我的二维码名片</span>
                            <span>
                                <i className='iconfont icon-erweima'></i>
                                <i className='iconfont icon-right'></i>
                            </span>
                        </p>
                    </div>
                    <div className='btns'>
                        <button className='btn' onClick={this.loginout.bind(this)}>退出登录</button>
                    </div>

                </section>
            </div>
        )
    }
}
export default Setting