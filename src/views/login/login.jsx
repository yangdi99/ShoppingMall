import React,{ Component } from 'react';
import './login.css'
import $http from '../../utils/http'
class Login extends Component{
    back () {
        let { history } = this.props;
        history.go(-1)
    }
    toLogin () {
        let { username,password } = this.refs;

        $http.post('/user/login',{
            username: username.value,
            password: password.value
        })
        .then(res => {
            if(res.success == 1){
                let from = this.props.location.state ? this.props.location.state.from || 'index/home':'index/home';
                document.cookie = 'token=' + res.token;
                this.props.history.push(from);
            }else{
                alert('登录出错，请重新登录')
            }
        })
    }
    registers () {
        let { history } = this.props;
        history.push('register')
    }
    render () {
        return (
            <div className='login'>
                <div className='headers'>
                    <div className='back' onClick={this.back.bind(this)}><span className='iconfont icon-xiangzuo'></span></div>
                    <div className='logs'>会员登录</div>
                    <div className='regis' onClick={this.registers.bind(this)}>注册</div>
                </div>
                <section className='contents'>
                    <div className='logins'>
                        <p>
                            <span className='iconfont icon-wode'></span>
                            <input type='text' className='username' placeholder='请输入您的手机号' ref='username'/>
                        </p>
                        <p>
                            <span className='iconfont icon-suo'></span>
                            <input type='password' className='password' placeholder='请输入您的密码' ref='password'/>
                        </p>
                    </div>
                    <div className='ascertain'><button onClick={this.toLogin.bind(this)}>立即登录</button></div>
                </section>
            </div>
        )
    }
}
export default Login