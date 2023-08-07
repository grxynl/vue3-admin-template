/**
 * 获取body上的css属性对应的值
 * @param {string} cssVariableName css属性
 */
export const getCssVariable = (cssVariableName: string) => {
    const globalDom = document.body
    return window.getComputedStyle(globalDom).getPropertyValue(cssVariableName) || ''
}

