export type Goods = {
    store: string // 商店
    name: string // 商品名称
    date: string // 日期
    isOnSale: 0|1 // 是否上架中,1为上架
    sales: {
        s_today: {
            revenue: number // 今日销量
        },
        s_lastWeek: {
            revenue: number // 上周的销量
        }
    },  // 销售额
    price: number  // 价格
    state: number[] // 销售状态
}

export type GetGoodsListParams={
    currentPage:number,
    pageSize:number,
}

export type GetGoodsListResult = {
    data:Goods[],
    total:number,
    pageSize:number,
    currentPage:number
}