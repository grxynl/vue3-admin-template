import {onMounted, ref} from 'vue'
import {NORMAL_THEME_INDEX} from '@/constants/setting'
import {SELECT_THEME_KEY} from '@/constants/cacheKeys'
import cache from '@/utils/cache'

export type Theme = {
    title: string,
    themeName: 'light' | 'dark'
}

const themeList: Theme[] = [{
    title: '明亮',
    themeName: 'light'
}, {
    title: '黑暗',
    themeName: 'dark'
}]

const currentTheme = ref<Theme>()


/** 更改body样式 */
const setBodyClassName = (className:string)=>{
    document.documentElement.className = className
}

/** 设置主题并缓存 */
const setTheme = (theme:Theme)=>{
    currentTheme.value = theme
    setBodyClassName(currentTheme.value.themeName)
    cache.setItem(SELECT_THEME_KEY,theme)
}

/** 设置缓存中的主题 */
const initTheme = ()=>{
    const cacheTheme = cache.getItem(SELECT_THEME_KEY)
  if (cacheTheme) {
    setTheme(cacheTheme)
  } else { 
    setTheme(themeList[NORMAL_THEME_INDEX])
  }
}

export  function useTheme() {
    /** 设置缓存的主题 */
    return {currentTheme,themeList,setTheme,initTheme}
}
