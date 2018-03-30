import React,{ Component } from 'react';
import './result.css'

class Result extends Component{
    componentDidMount () {
        let { location } = this.props;
    }
    render () {
        return (
            <div>
                Reault
            </div>
        )
    }
}

export default Result