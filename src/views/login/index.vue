<template>
    <div class="my-login-container">
        <div class="my-login-container-title">在线编辑器</div>
        <el-input class="my-login-container-input" v-model="user.username" placeholder="用户名" />
        <el-input class="my-login-container-input" v-model="user.password" placeholder="密码" />
        <el-button class="my-login-container-button" @click="onLogin">登录</el-button>
    </div>
</template>
   
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Buffer } from 'buffer'
import axios from 'axios'
import { useMessage } from 'naive-ui'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'

const message = useMessage()
const httpStore = useHttpStore()

interface User {
    username: string;
    password: string;
}

const router = useRouter()

const user = reactive<User>({
    username: httpStore.userConfig.userName,
    password: ''
})  

const onLogin = async () => {
    const resp = await login(user)
    if (resp.success) {
        message.info("登录成功", {
            closable: true,
            duration: 3000
        })
        await httpStore.setUserConfig(user.username)
        router.push('/store')
    }else{
        message.error("登录失败", {
            closable: true,
            duration: 3000
        })
    }
}

const login = async (user: User) => {
    // 登录接口
    const basePage = 'http://192.168.1.78/develop'
    const loginPage = '/Login/iView/Index?loginaction=uilogin&encodepwdmode=base64'

    // 处理用户名与密码
    const username = 'A' + Buffer.from(user.username).toString('base64')
    const password = 'A' + Buffer.from(user.password).toString('base64')

    // 创建axios实例
    const instance = axios.create({
        baseURL: basePage,
        // withCredentials: true,
        // 设置 form-data
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    })

    // 发送登录请求
    const res = await instance.post(loginPage, {
        txtUser: username,
        txtPwd: password
    })

    return { success: res.data.IsSucceed }
}

</script>

<style lang="scss" scoped>
@include go(login-container) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &-title {
        width: 100%;
        font-size: 20px;
        text-align: center;
        margin-bottom: 15px;
    }

    &-input {
        margin-bottom: 15px;
    }

    &-button {
        width: 100%;
    }
}
</style>