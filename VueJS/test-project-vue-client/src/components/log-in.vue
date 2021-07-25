<template>
  <el-container>
    <el-header>
      <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <router-link :to="{name: 'Index'}">
          <el-menu-item
              index="1"
              class="home"
          >Home</el-menu-item>
        </router-link>
      </el-menu>
    </el-header>

    <el-main type="flex" justify="center">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item
            prop="email"
            label="Email"
            :rules="[
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
      ]"
        >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item
            prop="pass"
            label="Password"
            :rules="[
        { required: true, message: 'Please input the password', trigger: 'blur' }
      ]"
        >
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="Confirm" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>

      </el-form>
    </el-main>

  </el-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'log-in',
    components: {},
    data() {
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('Please input the password again'));
      //   } else if (value !== this.ruleForm.pass) {
      //     callback(new Error('Two inputs don\'t match!'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        ruleForm: {
          email: '',
          pass: '',
          // checkPass: '',
        },
        rules: {          
          // checkPass: [
          //   { validator: validatePass2, trigger: 'blur' }
          // ],
        }
      };
    },
    computed: {
      ...mapGetters([
        'TOKENS', 'CREDENTIALS'
      ]),
    },
    methods: {
      ...mapActions([
          'GET_TOKEN_FROM_API'
      ]),

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');

            // console.log(this.GET_QUESTIONS_FROM_API());

            let login = this.ruleForm.email.toString();
            let password = this.ruleForm.pass.toString();
            // console.log(login);
            // console.log(password);
            this.GET_TOKEN_FROM_API({login, password});
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style></style>
