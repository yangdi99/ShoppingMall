##717食品

    1.路由
        *1 在主入口文件 渲染路由
        *2 src 下创建 router.config.js,搭建并抛出一级路由（登录，注册，详情页，设置），二级路由（首页，分类页，购物车，我的页面），还有404页面
        *3 在RouteWrapper.jsx组件中，封装公共路由调用路由，通过token字段判断页面是否授权（authorization），需要授权页面，进行登录，如果没有登录，重定向到登录页，否则return到路由所对应的组件<item.component {...location} routes={item.children} ></item.component>，将数据routes={item.children}传给子路由。
        *4 404页面是当路由匹配不上，或者写错时，将路由重定向到404页面

    2.页面

        首页
            头部的搜索框，input获取焦点跳转至search页
            轮播图：引入swiper组件
            在商品列goods-list，做后台接口请求数据
                *1 使用nodejs做后台接口，在serverjs中写后台接口
                *2 搭建http.js 基于fetch封装的请求方法，支持get和post 在goods-list直接引入http.js
                    例如： $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
                *3 接收到数据，渲染到页面，进行一个下拉加载更多数据，在数据未加载出图片时，做一个lazyload懒加载
                *4 点击商品进入详情页，在点击购物车进行添加商品时，会产生冒泡行为，用e.stopPropagation()阻止冒泡。
                *5 点击添加购物车，先判断是否是登录状态，是登录状态，点击添加购物车会弹出'购物车添加成功'，否则会重定向到登录页，进行登录

        分类列表页
            *1 遍历catList，通过id的不同进行点击切换
            *2 后台读取meal.json中的数据，遍历判断所对应的id，将匹配的信息push到thinglist中，传给前台
            *3 前台获取到数据，渲染到页面

        搜索页
            点击文本框进入search页, 在文本框中输入要搜索的内容, 判断搜索内容是否存在，不存在将搜索的内容存储到localStorage中，将localStorage中的内容渲染到页面，点击icon-shanchu,删除localStorage中存储的内容

        详情页
        购物车
            *1 进入cart页，先判断用户是否是登录状态，没有登录重定向到login页，登录状态进入cart页
            *2 进入之后，请求数据，用store方法, 将数据存储, 进行加减的操作
            *3 点击编辑，将编辑改为完成，结算改为删除 然后请求接口传要删除的商品的id以及token，删除成功后返回成功的信息和更新后的购物车数据，前端再根据数据更新store

        我的

            登录
                *1 前端收集用户的用户名和密码，传给后台用户的信息
                *2 后台判断此用户的信息是否存在，如果存在就可以进入，不存在就返回错误
                *3 后台根据用户的用户名及密码，使用jsonwebtoken生成密钥
                *4 后台将生成的密钥传给前台，前台将token字段在cookie中保存

            注册
                *1 前端收集用户的用户名和密码，传给后台用户的信息
                *2 后台先进行读取user.json中是否存在此信息，不存在将用户的信息存在user.json中
                *3 存储成功返回成功信息
            退出登录：获取到cookies, 将cookies超时，退出登录
    3.common组件封装

        弹出框

        轮播图模块

        商品模块

        筛选模块

        购物车商品模块

        邮寄地址模块

    4.技术选型

        React,redux,react-router,react-redux,redux-sage

        mobile端,自适应

        fetch，封装

        用node搭建一个简单的静态服务器，准备一定的模拟接口

        用脚手架，webpack，自行搭建可以切换不同环境的脚手架

    5.项目开发流程

        产品经理给出项目需求（也可能是客户需求）

        由产品经理或者UE出产品原型

        由UI设计根据原型出设计图/ 后端开始搭建数据库，开发接口

        前段开始实现页面布局，功能

        前端和后端进行联调，调试接口是否正常，前端页面是否正常

        测试人员介入进行黑盒或者白盒测试，提bug

        开发人员解决bug,大包上线