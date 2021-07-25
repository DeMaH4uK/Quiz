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
      <el-row type="flex" justify="left">
        <el-col :span="24">
          <div class="quiz" v-for="(item, index) in $store.getters.QUESTIONS" :key="item.id">
            <div v-show="index === questionIndex">
      <!--        1 choice-->
              <div v-show="index === 0">
                <quest_1 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 1">
                <quest_2 :item="item" :index="index" :user-answers="userAnswers" />
              </div>

      <!--        multiple choice-->
              <div v-show="index === 2">
                <quest_3 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 3">
                <quest_4 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 4">
                <quest_5 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 5">
                <quest_6 :item="item" :index="index" :user-answers="userAnswers" />
              </div>

      <!--        upload-->
              <div v-show="index === 6">
                <quest_7 :item="item" :index="index" :user-answers="userAnswers" />
              </div>

      <!--        1 choice-->
              <div v-show="index === 7">
                <quest_8 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 8">
                <quest_9 :item="item" :index="index" :user-answers="userAnswers" />
              </div>
              <div v-show="index === 9">
                <quest_10 :item="item" :index="index" :user-answers="userAnswers" />
              </div>

              <el-button
                  type="primary"
                  v-if="questionIndex > 0"
                  v-on:click="prev"
                  round>
                prev
              </el-button>

              <el-button
                  type="primary"
                  v-on:click="next"
                  round>
                next
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div v-show="questionIndex === $store.getters.QUESTIONS.length">
            <h2>Quiz finished</h2>
            <p>Итоговый счёт баллов: {{ final() }} / {{ $store.getters.QUESTIONS.length }}</p>
            <p>Процент ответов: {{ score() }}%</p>
            <p>Оценка: {{ mark(score()) }}</p>
            <el-button
                round
                v-on:click="oneMoreTime">
              One more time!
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>

  </el-container>
</template>

<script>
  import state from "@/store";
  import {mapActions} from "vuex";
  import Quest_1 from "@/components/quest_1";
  import Quest_2 from "@/components/quest_2";
  import Quest_3 from "@/components/quest_3";
  import Quest_4 from "@/components/quest_4";
  import Quest_5 from "@/components/quest_5";
  import Quest_6 from "@/components/quest_6";
  import Quest_7 from "@/components/quest_7";
  import Quest_8 from "@/components/quest_8";
  import Quest_9 from "@/components/quest_9";
  import Quest_10 from "@/components/quest_10";

  export default {
    name: 'quiz',
    // eslint-disable-next-line vue/no-unused-components
    components: {Quest_1, Quest_2, Quest_3, Quest_4, Quest_5, Quest_6, Quest_7, Quest_8, Quest_9, Quest_10},
    props: {},
    data() {
      return {
        questionIndex: 0,
        userAnswers: Array(state.getters.QUESTIONS.length).fill(0)
      };
    },
    methods: {
      ...mapActions([
        'GET_QUESTIONS_FROM_API',
        'REFRESH_TOKEN'
      ]),

      logout() {
        state.getters.CREDENTIALS.login = null;
      },
      next: function () {
        this.questionIndex++;
      },
      prev: function () {
        this.questionIndex--;
      },
      final: function () {
        return this.userAnswers.reduce((a, b) => a + b, 0);
      },
      score: function () {
        let best_score = state.getters.QUESTIONS.length;
        let our_score = this.final();

        return our_score * 100 / best_score;
      },
      mark: function (persents) {
        if (persents < 75) {
          return 2;
        }
        else if (persents >= 75 && persents < 85) {
          return 3;
        }
        else if (persents >= 85 && persents < 95) {
          return 4;
        }
        else if (persents >= 95) {
          return 5;
        }
      },
      oneMoreTime: function () {
        this.questionIndex = 0;
        this.GET_QUESTIONS_FROM_API();
      }
    },
    mounted() {
      // this.questionIndex = 0;
      this.GET_QUESTIONS_FROM_API();
    }
  }
</script>

<style>
#main {
  display: table-caption
}
#sub {
  float: left;
}

.quiz {
  display: inline-block;
}
</style>
