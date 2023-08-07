/*
* https://github.com/vbenjs/vite-plugin-mock
* 本mock的BUG：接口无法共享数据，每次刷新数据都会改变，等待修复。所以商品接口部分功能无法实现
* */
import {type MockMethod} from 'vite-plugin-mock'
import {captcha} from '@/utils/captcha'
const prefix = '/api'

const myUserName = 'admin'
const myPassWord = 'hanrui'

const maxGoodsNum = 123

// 我这里用ms当key值，生产环境需要生产唯一key，并且及时清理存储
let captchaSet = {}
const resetCaptcha = ()=>{
    captchaSet = {}
}

const mockConfig = [
    // 登录
    {
        url: "/login",
        method: "post",
        response: (res)=>{
            const {username,password,captchaId,verifyCode} = res.body
            if(captchaSet[captchaId]) {
                if (captchaSet[captchaId].toUpperCase() === verifyCode.toUpperCase()) {
                    resetCaptcha()
                    if(username == myUserName && password == myPassWord){
                        return {
                            code: 200,
                            message: '登录成功',
                            data: {token: 'admin'},
                        }
                    }else{
                        return {
                            code: 401,
                            message: '账号或密码错误，测试请用默认账号密码'}
                    }
                }
            }
            resetCaptcha()
            return {
                code: 401,
                message: '验证码错误！请刷新重试'}
        },
    },
    {
        url:"/captcha/img",
        method:"get",
        response:(req)=>{
            const { width=200,height=100} = req.query
            const {imgSrc,value} = captcha(parseInt(width),parseInt(height))
            // console.log('width,height',{imgSrc,value})
            const ms = Date.now() +''
            captchaSet[ms] = value
            return {
            code:200,
            message:'ok',
            data:{
                id:ms,
                img:imgSrc
            }}
        }
    },
    {
        url: "/user/info",
        method: "get",
        response: (res) => {
            return {
                code: 200,
                message: '获取成功',
                data: {
                    userName:'admin',
                    roles:[0,1]
                }
            }
        }
    },
    // 无权限测试
    {
        url: "/noPermission",
        method: "get",
        response: (res) => {
            return {
                code: 10001,
                message: '您没有权限访问',
                data:null
            }
        }
    },
    // 商品
    {
        url: "/getGoodList",
        method: "get",
        response: ({query}) => {
            const {pageSize=10,currentPage=1} = query
            // 商品信息
            const goodsList = {}
            goodsList['data|'+pageSize] = [{
                'id|+1':1,
                store: /一号店铺|二号店铺/,
                date: '2023-08-01',
                name: '商品A',
                sales: {
                    s_today: {
                        'revenue|120000-200000': 200000
                    },
                    s_lastWeek: {
                        'revenue|120000-200000': 200000
                    }
                },  // 销售额
                'isOnSale|0-1':1,
                price: '@float(10, 50, 2,2)',
                'state':['@integer(0, 4)']
            }]
            return {
                code:200,
                message:'ok',
                data:{
                    ...goodsList,
                    total:maxGoodsNum,
                    pageSize:10,
                    currentPage:1
                }
            }
        }
    }
] as MockMethod[]

/** 给每个路由加上固定的前缀 */
const decorateMockConfig = mockConfig.map(e => {
    return {...e, url: prefix + e.url}
})

export default decorateMockConfig

