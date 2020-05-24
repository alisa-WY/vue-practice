<template>
    <div>
        <KForm :model="userInfo" :rules="rules" ref="login-form">
            <!-- 用户名 -->
            <KFormItem label="用户名" prop="username">
                <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
            </KFormItem>
            <!-- 密码 -->
            <KFormItem label="密码" prop="password">
                <KInput type="password" v-model="userInfo.password" placeholder="请输入用户名"></KInput>
            </KFormItem>
            <!-- 提交按钮 -->
            <KFormItem>
                <button @click="login">登录</button>
            </KFormItem>
        </KForm>
    </div>
</template>

<script>
import KInput from './KInput.vue'
import KFormItem from './KFormItem.vue'
import KForm from './KForm.vue'
// import Notice from '../Notice.vue'
export default {
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data () {
    return {
      userInfo: {
        username: 'haha',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名称' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    login () {
      this.$refs['login-form'].validate(valid => {
        const notice = this.$notice({
          title: '社会你杨哥喊你来搬砖',
          message: valid ? '请求登录!' : '校验失败!',
          duration: 2000
        })
        // const notice = this.$create(Notice, {
        //   title: '社会你杨哥喊你来搬砖',
        //   message: valid ? '请求登录!' : '校验失败!',
        //   duration: 2000
        // })
        // dom节点show出来
        notice.show()
      //   this.$refs['login-form'].validate(valid => {
      //     if (valid) {
      //       alert('submit')
      //     } else {
      //       console.log('error submit')
      //       return false
      //     }
      })
    }
  }
}
</script>

<style>

</style>
