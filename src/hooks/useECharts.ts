import type {EChartsOption} from 'echarts'
import echarts from '@/utils/echarts'
import {onUnmounted, watch} from "vue";
import {useTheme} from '@/hooks/useTheme'
import {getCssVariable} from "@/utils";

const {currentTheme} = useTheme()

export type DynStyle = {
    title?: object
    legend?: object
    xAxis?: object
    yAxis?: object
}

function getDynFontStyleOptions(key, color) {
    if (!key || !color) return
    const styleOptions: DynStyle = {
        title: {
            textStyle: {
                color
            }
        },
        xAxis: {
            axisLabel: {
                color
            }
        },
        yAxis: {
            axisLabel: {
                color
            }
        },
        legend: {
            textStyle: {
                color
            }
        }
    }
    return styleOptions[key]
}


export function useECharts() {
    let myChart: echarts.ECharts | null
    let options: EChartsOption
    let DynStyleSetting: Array<keyof DynStyle> = []

    /** 初始化echarts */
    function initChart(el: HTMLElement, DynStyle: Array<keyof DynStyle>) {
        myChart = echarts.init(el)
        listenResize()
        DynStyle && setDynSetting(DynStyle)
    }

    /** 设置 echarts options */
    function setOptions(opt: EChartsOption) {
        const DynStyle = getDynStyle()
        myChart?.setOption(opt)
        myChart?.setOption(DynStyle)
        options = opt
    }


    /** 配置需要动态变化的样式 */
    function setDynSetting(arr: Array<keyof DynStyle>) {
        DynStyleSetting = arr
    }

    /** 获取chat最新样式 */
    function getDynStyle() {
        const DynStyle: DynStyle = {}
        const fontColor = getCssVariable('--theme-font-color')
        DynStyleSetting.forEach(k => {
            const style = getDynFontStyleOptions(k, fontColor)
            style && Reflect.set(DynStyle, k, style)
        })
        return DynStyle
    }

    /** chart自适应大小 */
    function resize() {
        myChart?.resize({
            animation: {
                duration: 500,
            }
        })
    }

    function listenResize() {
        window.addEventListener('resize', resize)
    }

    function removeResize() {
        window.removeEventListener('resize', resize)
    }

    /** 销毁echarts */
    function dispose() {
        if (myChart) {
            removeResize()
            myChart.dispose()
            myChart = null
        }
    }

    onUnmounted(() => {
        dispose()
    })

    /** 监听主题变化 */
    watch(() => currentTheme.value, (newVal) => {
        const DynOptions = getDynStyle()
        setOptions(DynOptions)
    }, {
        immediate: true
    })

    return {
        initChart,
        setOptions
    }
}