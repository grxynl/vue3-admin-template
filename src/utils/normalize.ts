/**
 * @description 将路径中的/进行格式化
 * @param {string} path 处理的路径
 * @returns {string} 路径/去重
 */
export const normalizeUrl = (path:string)=>{
    return path.replace(/(https?:\/)|(\/)+/g,'$1$2')
}