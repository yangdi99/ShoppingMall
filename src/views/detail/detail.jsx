import React,{ Component } from 'react';

class Detail extends Component{
    componentDidMount () {
        console.log(this.props)
    }
    render () {
        return (
            <div>Detail</div>
        )
    }
}
export default Detail