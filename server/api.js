const fs = require('fs');
const http=require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const querystring=require('querystring');
const mock = require('mockjs');
const _ = require('lodash');
function queryApi(url, methods, params){
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'www.lb717.com',
			port: 80,
			path: url,
			method: methods,
			headers: {
			"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
			}
		}
		let data = "";
	    let request = http.request(options, (response) => {
	        response.setEncoding('utf8');
	        response.on('data', ( chunked ) => {
	            data += chunked;
	        })
	        response.on('end', () => {
	            resolve(JSON.stringify(data))
	        })
	    })
	    if(methods.toLowerCase() == 'post'){
	    	request.write(querystring.stringify(params))
	    }
	    request.end()
	})

}
module.exports = function (app) {
	// const options = {
	// 	hostname: 'www.lb717.com',
	// 	port: 80,
	// 	path: '/mall/index/getGoodsChannel',
	// 	method: 'POST',
	// 	headers: {
	// 	"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
	// 	}
	// }
	//商品列表的接口
	app.post('/mall/index/getGoodsChannel',function(req,res){
	/*    let data = "";
	    let request = http.request(options, (response) => {
	        response.setEncoding('utf8');
	        response.on('data', ( chunked ) => {
	            data += chunked;
	        })
	        response.on('end', () => {
	            res.end(JSON.stringify(data))
	        })
	    })
	    request.write(querystring.stringify(req.body))
	    request.end()*/
	    queryApi('/mall/index/getGoodsChannel','POST', req.body)
	    .then(data => {
	    	res.end(data)
	    })
	})

	//注册接口
	app.post('/user/register', function(req, res){
	    let user = fs.readFileSync(path.join(__dirname,'/user.json'),{encoding:'utf-8'})
	    user = JSON.parse(user);
	    user.push(req.body);
	    fs.writeFile(path.join(__dirname,'/user.json'),JSON.stringify(user), function(){
	        res.end(JSON.stringify({
	            'success': '1',
	            'info': 'register success'
	        }))
	    });
	})

	//登录接口
	app.post('/user/login', function(req, res){
	    let user = fs.readFileSync(path.join(__dirname,'/user.json'),{encoding:'utf-8'})
	    user = JSON.parse(user);
	    let login = req.body;
	    let resInfo = {
	        success: 0,
	        info: '用户名或密码错误',
	        token: ''
	    }
	    user.forEach(user => {
	        if(user.username == login.username && user.password == login.password){
	            resInfo.success = 1;
	            resInfo.info = 'login succes';
	        }
	    })
	    if(resInfo.success == 1){
	        resInfo.token = jwt.sign(login, '8520',{
	            expiresIn: 60
	        })
	    }
	    res.end(JSON.stringify(resInfo))
	})

	//添加购物车
	app.post('/user/Cart/addCart', function(req, res){
	    jwt.verify(req.body.token,'8520',(err,decoded)=>{
	        if(err){
	            res.end(JSON.stringify({
	                info:'登录失败，请重新登录',
	                detail:err.TokenExpiredError
	            }))
	        }else{
	            let cartInfo = JSON.parse(fs.readFileSync(path.join(__dirname,'/cart_info.json'),{encoding:'utf-8'}))

	            if(cartInfo[decoded.username]){
	            	let recordList = cartInfo[decoded.username];
	            	let flag = false; //新添加商品
	            	recordList.forEach((item,index) => {
	            		if( item.goods_id == req.body.goods_info.goods_id ){
	            			++item.count;
	            			flag = true;//重复商品
	            		}
	            	})
	            	if(!flag) {
		            	let record = req.body.goods_info;
		            	record.count = 1;
		            	record.selected = 0;
		                cartInfo[decoded.username].push(record)
	            	}

	            }else{
	            	let record = req.body.goods_info;
	            	record.count = 1;
	            	record.selected = 0;
	                cartInfo[decoded.username] = [record]
	            }
	            fs.writeFile(path.join(__dirname,'/cart_info.json'),JSON.stringify(cartInfo),function(){
	                res.end("1")
	            })
	        }
	    })
	})

	//分类接口
	app.get('/mobile/Category/categorySon', function(req, res){
	    let num = querystring.stringify(req.query).split('=')[1]
	    let goodArr=JSON.parse(fs.readFileSync('server/meal.json',{encoding:'utf-8'}))['list'];
	    let thinglist=[]
	    goodArr.forEach((item,index)=>{
	    	item['goodslist'].forEach((itemlist,indexlist)=>{
	    		if(itemlist['sonid']==num){
	    			thinglist.push(itemlist)
	    		};
	    	})
	    })
	    res.end(JSON.stringify(thinglist))
	})

	//登录过后获取购物车的商品记录
	app.post('/user/Cart/goodsList', function(req, res){
		jwt.verify(req.body.token,'8520',(err,decoded)=>{
			if(err){
	            res.end(JSON.stringify({
	                info:'登录失败，请重新登录',
	                detail:err.TokenExpiredError,
	                error: 1
	        	}))
	        }else{
	        	try{
		        	let goodsRecord = JSON.parse(fs.readFileSync('server/cart_info.json',{encoding: 'utf-8'}))
		        	let goodsLists = goodsRecord[decoded.username] || []
					res.json(goodsLists)
	        	}
	        	catch(error){
	        		res.json(error)
	        	}
	        }
		})
	})

	//删除购物车指定商品
	app.post('/user/Cart/delGoods', function(req,res){
		let cartRecord = JSON.parse(fs.readFileSync('server/cart_info.json',{encoding: 'utf-8'}))
		jwt.verify(req.body.token,'8520',(err, decoded)=>{
			if(err){
				res.json(err)
			}else{
				let cartList = cartRecord[decoded.username]
				let delGoods = _.remove(cartList, function(item){
					return req.body.selectedID.indexOf(item.goods_id) > -1
				})
				cartRecord[decoded.username] = cartList;
				fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartRecord), function(){
					res.json({
						success: 1,
						info: '删除成功',
						delGoods: delGoods,
						leftGoods: cartList
					})
				})

			}
		})
	})
}