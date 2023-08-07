
import {type Response, request} from "@/utils/request";
import {GetGoodsListParams,GetGoodsListResult} from './type/table'

export function noPermission(){
    return request<Response<null>>(
        {
            url:'noPermission',
            method:'get',
        }
    )
}

export function getGoodList(params:GetGoodsListParams){
    return request<Response<GetGoodsListResult>>({
        url:'getGoodList',
        method:'get',
        params
    },{
        successMsgShow:false
    })
}