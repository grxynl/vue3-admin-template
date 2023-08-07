export type LoginParams = {
    username:string;
    password:string;
    captchaId:string;
    verifyCode:string;
}

export type LoginResult = {
    token:string;
}

export type CaptchaParams = {
    width?:number;
    height?:number;
}

export type CaptchaResult = {
    img:string;
    id:string;
}

export type userInfoResult = {
    userName:string,
    roles:number[]
    [anykey:string|number]:any
}
