import React,{ Component } from 'react';
import './register.css'
import $http from '../../utils/http'
class Register extends Component{
    back () {
        let { history } = this.props;
        history.go(-1)
    }
    toRegister () {
        let { username,password } = this.refs;

        $http.post('/user/register',{
            username: username.value,
            password: password.value
        })
        .then(res => {
            if(res.success == 1){
                this.props.history.push("/login")
            }
        })
    }
    logins () {
        let { history } = this.props;
        history.push('login')
    }
    render () {
        return (
            <div className='register'>
                <div className='headers'>
                    <div className='back' onClick={this.back.bind(this)}><span className='iconfont icon-xiangzuo'></span></div>
                    <div className='regs'>注册会员</div>
                    <div className='logines' onClick={this.logins.bind(this)}>登录</div>
                </div>
                <section className='contents'>
                    <div className='registers'>
                        <p>
                            <span className='iconfont icon-wode'></span>
                            <input type='text' className='username' placeholder="请输入您的手机号" ref='username'/>
                        </p>
                        <p>
                            <span className='iconfont icon-suo'></span>
                            <input type='password' className='password' placeholder='请输入您的密码' ref='password'/>
                        </p>
                    </div>
                    <div className='ascertain'><button onClick={this.toRegister.bind(this)}>确定</button></div>
                </section>
            </div>
        )
    }
}
export default Register