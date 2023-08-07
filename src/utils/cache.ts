import {DEFAULT_CACHE_TIME} from '@/constants/setting'

interface CacheCls {
    getItem(key: string): any,

    setItem(key: string, value: any): void,

    removeItem(key: string): void,

    clear(): void,

    setCookie(key: string, value: any, expire: number): void,

    getCookie(key: string): string,

    removeCookie(key: string): void,
}

/** 定义储存方式 */
const CacheType = localStorage
/** 定义前缀 */
const prefix = 'hr_'

/**
 * 本地缓存
 * @class Cache
 */
class Cache implements CacheCls {
    private storage = CacheType
    private prefix = prefix

    private getKey(key: string) {
        return  `${this.prefix}${key}`.toUpperCase()
    }

    /**
     * @description 获取缓存值
     * @param {string} key 缓存的键值
     * @returns {any|boolean} 返回值或false
     */
    getItem<T = any>(key: string): T | boolean {
        const item = this.storage.getItem(this.getKey(key))
        if (item) {
            try {
                const data = JSON.parse(item)
                const {value, expire} = data;
                if (expire === null || expire >= Date.now()) {
                    return value
                }
                this.removeItem(this.getKey(key))
            } catch (err) {
                return false
            }
        }
        return false
    }

    /**
     * @description 设置缓存值
     * @param {string} key 存入的键值
     * @param {any} value 存入的值
     * @param {number} expire 存储的时长 s
     */
    setItem(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
        const dataStr = JSON.stringify({
            value: value,
            expire: expire ? Date.now() + expire * 1000 : null
        })
        this.storage.setItem(this.getKey(key), dataStr)
    }

    /**
     * @description 移除某个缓存
     * @param key 缓存的键值
     */
    removeItem(key: string) {
        this.storage.removeItem(this.getKey(key))
    }

    clear() {
        this.storage.clear()
    }

    /**
     * @description 根据键值获取cookie内容
     * @param key
     * @returns {string}
     */
    getCookie(key: string): string {
        const cookieList = document.cookie.split('; ')
        for (const cookie of cookieList){
            const kv = cookie.split('=')
            if (kv[0] === this.getKey(key)) {
                return kv[1]
            }
        }
        return ''
    }

    /**
     * @description 设置cookie
     * @param {string} key
     * @param {any} value
     * @param {number} expire
     */
    setCookie(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
        document.cookie = `${this.getKey(key)}=${value}; max-age=${expire}`
    }

    /**
     * @description 移除cookie
     * @param key
     */
    removeCookie(key: string): void {
        this.setCookie(key, 1, -1)
    }
}

export default new Cache()
