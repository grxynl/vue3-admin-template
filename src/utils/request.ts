import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ACCESS_TOKEN_KEY} from '@/constants/cacheKeys'
import {LOG_OUT_CODE} from '@/constants/setting'
import cache from '@/utils/cache'
import {ElMessage} from "element-plus";
import {normalizeUrl} from "@/utils/normalize";

export interface RequestOptions {
    /** 成功是否弹出消息 */
    successMsgShow?: boolean,
    /** 失败是否弹出消息 */
    errorMsgShow?: boolean,
    /** 使用mock数据 */
    mock?: boolean
}

/** 定义未知错误 */
const UNKNOWN_ERROR = "未知错误,请重试"

/** 真实请求路径 */
const baseApiUrl = import.meta.env.VITE_BASE_URL

/** 模拟请求路径 */
// const mockApiUrl = import.meta.env.VITE_MOCK_BASE_URL
const mockApiUrl = window.location.origin + '/api/'

const instance = axios.create({
    timeout: 8000,
})

/** 请求前传入身份信息 */
instance.interceptors.request.use(
    function(config){
        const token = cache.getCookie(ACCESS_TOKEN_KEY)
        if (token && config.headers) {
            config.headers['Authorization'] = token;
        }
        return config
    },

    function(err){return Promise.reject(err)}
)

instance.interceptors.response.use(function (response){
        const receiveData = response.data
        const code = receiveData.code
        switch (code){
            case 200:
                return response
            case 401:
                return response
            case LOG_OUT_CODE:
                cache.clear()
                cache.removeCookie(ACCESS_TOKEN_KEY)
                window.location.reload()
                return response
            default:
                const error = new Error(receiveData.message || UNKNOWN_ERROR + ', with the status code is ' + receiveData.code || 'unknown code')
                return Promise.reject(error);
        }

    },
    function(err){
        const errMsg = err?.response?.data?.message ?? UNKNOWN_ERROR;
        ElMessage.error(errMsg)
        err.message = errMsg
        return Promise.reject(err)
    })

// 定义一个返回数据的范式
export type Response<T = any> = {
    code: number;
    message: string;
    data: T;
}

// export type BaseResponse<T = any> = Promise<Response<T>>

export const request = async <T = any>(
    config: AxiosRequestConfig,
    options: RequestOptions = {},
): Promise<T> => {
    try {
        // mock 实际开发默认为false比较好
        const { successMsgShow=true, errorMsgShow=true, mock = true} = options
        // 动态host
        const fullUrl = mock ? mockApiUrl + config.url : baseApiUrl + config.url
        config.url = normalizeUrl(fullUrl)
        const res = await instance.request(config)
        // console.log(res)
        // 只控制弹窗，具体code处理逻辑在拦截器中
        if (res.data.code === 200) {
            successMsgShow && ElMessage.success(res.data.message)
        } else {
            errorMsgShow && ElMessage.error(res.data.message || UNKNOWN_ERROR)
        }

        return res.data
    } catch (err) {
        return Promise.reject(err)
    }
}

