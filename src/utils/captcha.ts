import {createCanvas} from 'canvas'
/**
 * @description 生成随机字符
 * @param size 字符数
 * @return {Array<string>>} 字符列表
 */
function genRandomStr(size: number = 4): Array<string> {
    const range = ['0', '1', '2', '3', '4', '5', '6', "7", '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const strList:Array<string> = []
    for (let i = 0; i < size; i++) {
        const randomStr = range[Math.floor(Math.random() * range.length)]
        strList.push(randomStr)
    }
    return strList
}

/**
 * @description 生成随机颜色
 * @return {string} 随机rgb颜色
 */
function randomColor():string {
    const randR = Math.floor(Math.random() * 256);
    const randG = Math.floor(Math.random() * 256);
    const randB = Math.floor(Math.random() * 256);
    return `rgb(${randR},${randG},${randB})`;
}

export type Captcha = {
    imgSrc: string
    value: string
}
type Options = {
    lines?:number
    colors?:boolean
}
/**
 * @description 使用验证码
 * @param {number} width 画布宽度
 * @param {number} height 画布高度
 * @param {Options} options 配置
 * @return {Captcha} 图片链接和字符集
 */
export const captcha = (width: number = 100, height: number = 50, {lines=3,colors=true}:Options={}): Captcha => {
    // 生成随机内容
    const canvas = createCanvas(width,height)
    const ctx = canvas.getContext('2d')
    const captcha = genRandomStr()

    for (let i in captcha) {
        const str = captcha[i]
        const transLen = width * 0.8 / captcha.length
        const sizeRatio = 0.4 + 0.4 * Math.random()
        const degRatio = (Math.random() - 0.5) * (height/width)
        ctx!.font = height * sizeRatio + "px serif";
        ctx!.rotate(degRatio)
        if(colors){
            ctx!.fillStyle = randomColor();
        }
        ctx?.fillText(str, width * 0.1, height * 0.8, width * 0.8)
        ctx!.translate(transLen, 0)
        ctx!.rotate(-degRatio)
    }
    // 线条
    ctx!.translate(-width * 0.8, 0);
    for (let i = 0; i <= lines; i++) {
        ctx!.beginPath(); // 新建画图路径
        ctx!.strokeStyle = randomColor();
        ctx!.moveTo(Math.random() * width, Math.random() * height);
        ctx!.lineTo(Math.random() * width, Math.random() * height);
        ctx!.stroke();
    }
    const result: Captcha = {
        imgSrc: canvas.toDataURL(),
        value: captcha.join('')
    }
    return result
}

