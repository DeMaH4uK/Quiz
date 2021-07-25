<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <h1>{{ item.question }}</h1>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-radio-group
              id="main"
              v-model="radio" @change="checking">
            <el-radio
                id="sub"
                v-for="response in item.responses" :key="response.text"
                :label="!!response.correct">
              {{ response.text }}
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "quest_1",
  props: ['item', 'index', 'userAnswers'],
  data() {
    return {
      radio: 0,
    };
  },
  methods: {
    checking: function (e) {
      let countOfRightAnswers = this.item.responses.filter((elem) => elem.correct === true).length;

      let score = 1 / countOfRightAnswers;

      if (e) {
        this.userAnswers[this.index] = score;
      }
      else {
        this.userAnswers[this.index] = 0;
      }

      // console.log(this.userAnswers);
    },
  },
}
</script>

<style>
</style>