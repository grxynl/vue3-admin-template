import {type Response, request} from "@/utils/request";
import type {LoginParams,LoginResult,CaptchaParams,CaptchaResult,userInfoResult} from './type/login'



/**
 * @description 登录
 * @param {LoginParams} data 登录参数
 * @return {LoginResult} 返回token
 */
export function login(data:LoginParams){
    return request<Response<LoginResult>>(
        {
            url:'login',
            method:'post',
            data
        }
    )
}

export function getImageCaptcha(params?:CaptchaParams){
    // console.log('params',params)
    return request<Response<CaptchaResult>>({
        url:'captcha/img',
        method:"get",
        params,
    },{
        successMsgShow:false
    })
}

export function getUserInfo(){
    return request<Response<userInfoResult>>({
        url:'user/info',
        method:'get'
    },{
        successMsgShow:false
    })
}
