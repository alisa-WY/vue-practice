<template>
    <div>
        <!-- 传递值和规则一边form进行验证 -->
        <WForm :model="userInfo" :rules="rules" ref="login-form">
            <WFormItem label="用户名" prop="username">
                <WInput v-model="userInfo.username" placeholder="请输入用户名"></WInput>
            </WFormItem>
            <WFormItem label="密码" prop="password">
                <WInput type="password" v-model="userInfo.password"></WInput>
            </WFormItem>
            <WFormItem>
                <button @click="login">登录</button>
            </WFormItem>
        </WForm>
    </div>
</template>

<script>
import WInput from './WInput'
import WFormItem from './WFormItem'
import WForm from './WForm'
export default {
  components: {
    WInput,
    WFormItem,
    WForm
  },
  data () {
    return {
      userInfo: {
        username: 'tom',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名称' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    // 登录进行全体验证
    login () {
      this.$refs['login-form'].validate(valid => {
        if (valid) {
          alert('submit')
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
