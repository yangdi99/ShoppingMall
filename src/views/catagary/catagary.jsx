import React,{ Component } from 'react';
import './catagary.css'
import $http from '../../utils/http'
class Catagary extends Component{
    constructor () {
        super()
        this.state = {
            activeIndex: 0,
            contents:[]
        }
    }
    toggleActive (index) {
        this.setState({
            activeIndex: index
        })
        $http.get('/mobile/Category/categorySon',{sonid:index+1})
        .then((res)=>{
            this.setState({
                contents:res
            })
        })
    }
    toSearch () {
        let { history } =this.props;
        history.push('search')
    }
    render(){
        let {contents}=this.state
        let catList = ['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        return (
            <div className='catagary'>
                <header className='header1'>
                    <div className='input'>
                        <span className='iconfont icon-search'></span>
                        <input type='text' placeholder='请输入您要购买的商品' onFocus={this.toSearch.bind(this)}/>
                    </div>
                </header>
                <div className='catagary-wrap'>
                    <div className='left-side'>
                        <ul>
                            {
                                catList.map((item,index) => {
                                    return <li className={this.state.activeIndex == index ? 'actagory-active' : ''} key={index} onClick={() => {this.toggleActive(index)}}> {item} </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='right-side'>
                        {
                            (contents.length > 1) ? contents.map((item,index)=>{
                                return <dl key={index}><dt><img src={item.img}/></dt><dd>{item.name}</dd></dl>
                            }):<p>暂无您所点击的商品</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Catagary