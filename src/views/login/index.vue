<template>
  <section class="mask center-center-flex">
    <div class="main-wrapper">
      <div class="address">
      </div>
    <section class="login-wrapper ">
      <div class="logo-wrapper">
        <span class="title">登录</span>
      </div>
  <el-form :inline="false" :model="loginForm" class="    login-form">
    <el-form-item>
      <p> 用户名</p>
      <el-input v-model.trim="loginForm.user" placeholder="用户名" clearable  />
    </el-form-item>
    <el-form-item icon>
      <p>密码</p>
      <el-input v-model.trim="loginForm.password"  type="password" placeholder="密码" clearable />
    </el-form-item>
    <el-form-item>
      <p>验证码</p>
      <div class="verify-wrapper">
        <el-input  class="verify-input" v-model.trim="loginForm.verifyCode"  minlength="4"  @keyup.enter="login" placeholder="验证码" />
        <el-image @click="getCaptcha" class="verify-img" :src="captchaImg" ></el-image>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-btn"  @click="login">登录</el-button>
    </el-form-item>
  </el-form>
    </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {useUserStore} from '@/store/user'
import {useRoute, useRouter} from 'vue-router'

/** 登录表单数据 */
function loginSource(){
  return {
    user: 'admin',
    password: 'hanrui',
    verifyCode:''
  }
}

let loginForm = reactive(loginSource())

// 重置表单
function resetLoginForm(){
  Object.assign(loginForm,loginSource())
}

/** 路由 */
const route = useRoute()
/** 验证码 */
const userStore = useUserStore()
const router = useRouter()
const captchaImg = ref<string>('')
async function getCaptcha(){
  const captcha = await userStore.getCaptcha(100,50)
  captchaImg.value = captcha
}

/** 登录 */
function login(){
  userStore.login(
      loginForm.user,
      loginForm.password,
      loginForm.verifyCode
  ).then(res=>{
    if(res){
        router.replace((route.query.redirect as string) ?? '/')
    }else{
      resetLoginForm()
      getCaptcha()
    }
  })
}


onMounted(()=>{
  getCaptcha()
  setAnimation()
})

// 动画
function setAnimation(){
  const dom = document.querySelector('.main-wrapper') as HTMLHtmlElement
  if(dom){
    // 计算dom中心点
    const {top,left} = dom.getBoundingClientRect()
    const centerX = dom.offsetWidth/2+left
    const centerY = dom.offsetHeight/2+top
    let lock = false
    dom.addEventListener('mousemove', (event:MouseEvent)=>{
      if(lock) return
      lock = true
      window.requestAnimationFrame(()=>{
        lock = false
        const reactiveX = event.pageX - centerX
        const reactiveY = event.pageY -centerY
        const rateX = reactiveX/centerX *2
        const rateY = reactiveY/centerY *2
        dom.style.transform = `perspective(800px) rotateX(${rateX}deg) rotateY(${rateY}deg)`
      })
    })
  }
}

</script>
<style lang="less" scoped>

@login-font-size:18px;
@login-line-height:40px;

.mask{
  position: fixed;
  width: 100vw;
  height:100vh;
  background-color: #eaeffb;
}
.main-wrapper {
  overflow: hidden;
  position: relative;
  width: 800px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 5px 20px #999;
  .address{
    position: absolute;
    width: 520px;
    height: 100%;
    background-color: #79bbff;
    background-image: url("@/assets/image/loginLogo.png");
    background-size: cover;
  }
  .login-wrapper {
    position: absolute;
    right: 0;
    width: 300px;
    height: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: -1px 0 5px #999;

    .logo-wrapper {
      .title {
        font-size: 30px;
        line-height: 80px;
      }
    }

    .login-form {
      ::v-deep(.el-input__wrapper) {
        height: @login-line-height;
        margin-top: 10px;
        font-size: @login-font-size;
        border-radius: 0;
        border-bottom: 1px solid #000;
        box-shadow: none;
      }

      ::v-deep(.el-form-item__content) {
        font-size: @login-font-size;
      }

      .verify-wrapper {
        display: flex;
        align-items: flex-end;
        width: 100%;

        .verify-input {
          width: 50%;
          margin-right: 5%;
        }

        .verify-img {
          position: absolute;
          right: 0;
          float: right;
          width: 45%;
        }
      }

      .login-btn {
        width: 50%;
        height: @login-line-height;
        margin: 10px auto;
        border-radius: 25px;
      }
    }

  }
}
</style>
