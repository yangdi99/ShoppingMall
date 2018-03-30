import $http from '../../utils/http';
import { getCookie } from '../../utils/utils.js';
import { UPDATE_GOODS_LIST,SELECTED_ALL } from '../../store/reducers.js'
export default function mapDispatchToProps(dispatch){
    return {
        fetchGoodsList (history) {
            $http.post('/user/Cart/goodsList',{
                token: getCookie('token')
            })
            .then(res=>{
                console.log(res)
                if(res.error == 1) {
                    history.push('/login',{
                        from: '/index/cart'
                    })
                }else{
                    dispatch({
                        type: UPDATE_GOODS_LIST,
                        data: res
                    })
                }
            })
        },
        selectedAll(str){
            dispatch({
                type: SELECTED_ALL,
                data: str
            })
        },
        delCartGoods(selectedID){
            $http.post('/user/Cart/delGoods',{
                token: getCookie('token'),
                selectedID
            })
            .then(res => {
                if(res.success == 1){
                    dispatch({
                        type: UPDATE_GOODS_LIST,
                        data: res.leftGoods
                    })
                }
            })
        }
    }
}