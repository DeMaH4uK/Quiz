<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <router-link :to="{name: 'Quiz'}">
          <el-menu-item
              index="2"
              class="home"
          >Quiz</el-menu-item>
        </router-link>
        <span @click="logout"><router-link :to="{name: 'Logout'}">
          <el-menu-item
              index="4"
              class="log"
          >Log Out</el-menu-item>
        </router-link></span>
        <router-link :to="{name: 'Login'}">
          <el-menu-item
              index="3"
              class="log"
          >Log In</el-menu-item>
        </router-link>
      </el-menu>
    </el-header>

    <el-main>
      <div>
        <p class="text">Давайте пройдём тест.<br />Но для начала нужно авторизоваться в системе или зарегистрироваться.</p>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  // import Quiz from './quiz'
  import { mapActions, mapGetters } from 'vuex'
  import state from "@/store";

  export default {
    name: 'main-wrapper',
    // components: {
    //   Quiz,
    // },
    props: {},
    // data() {},
    computed: {
      ...mapGetters([
        'QUESTIONS', 'CREDENTIALS'
      ]),
    },
    methods: {
      ...mapActions([
        'GET_QUESTIONS_FROM_API'
      ]),
      logout() {
        // console.log('Hello');
        state.getters.CREDENTIALS.login = null;
      }
    },
    watch: {},
    mounted() {
      this.GET_QUESTIONS_FROM_API();
      // console.log('Hello World!');
      // console.log(this.GET_QUESTIONS_FROM_API());
    },
  }
</script>

<style>
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }
  .el-row {
    margin-bottom: 20px;
    /*&:last-child {*/
    /*  margin-bottom: 0;*/
    /*}*/
  }
  .el-col {
    border-radius: 4px;
  }
  .text {
    font-size: 2em;
  }

  .log {
    float: right;
  }
  .home {
    float: left;
  }
</style>
