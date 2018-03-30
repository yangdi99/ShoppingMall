import React,{ Component } from 'react';
import './search.css'
class Search extends Component{
    constructor () {
        super()
        this.state = {
            historylist: []
        }
    }
    toSearch () {
        let keyWords = this.refs.keyWords.value;
        if(!keyWords) return;
        let ls = localStorage;
        if(ls.getItem('SearchHistory')){
            let shArr = JSON.parse(ls.getItem('SearchHistory'));
            if(shArr.indexOf(keyWords) > -1 ) return;
            shArr.push(keyWords)
            ls.setItem('SearchHistory', JSON.stringify(shArr))
        }else{
            ls.setItem('SearchHistory', JSON.stringify([keyWords]))
        }

        this.props.history.push('/index/result',{
            key_words: keyWords
        })

    }
    componentDidMount () {
        if( localStorage.getItem('SearchHistory') ){
            this.setState({
                historylist: JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
    toResult (keyWords) {
        this.props.history.push('/index/result',{
            key_words: keyWords
        })
    }
    clearHistory () {
        localStorage.removeItem('SearchHistory');
        this.setState({
            historylist: []
        })
    }
    render () {
        let { historylist } = this.state;
        return (
            <div className='search'>
                <div className='header1'>
                    <div className='input'>
                        <span className='iconfont icon-search'></span>
                        <input type='text' placeholder='请输入您要购买的商品' ref='keyWords'/>
                    </div>
                    <div className='searchs' onClick={this.toSearch.bind(this)}>搜索</div>
                </div>
                <div className='sections'>
                    <div className='recent-search'>
                        <div className='recent'>
                            <span>最近搜索</span>
                            <span className='iconfont icon-shanchu' onClick={this.clearHistory.bind(this)}></span>
                        </div>
                        {historylist.length == 0? <p>暂无搜索记录</p> :
                            <div className='recent-searchs'>
                                {
                                    historylist.map((item, index) => {
                                        return <span key={index} onClick={() => {this.toResult(item)}}>{item}</span>
                                    })
                                }
                            </div>
                        }

                    </div>
                    <div className='all-search'>
                        <div className='all'>大家都在搜</div>
                        <div className='all-searchs'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Search