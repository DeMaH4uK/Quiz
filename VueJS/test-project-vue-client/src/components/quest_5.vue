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
          <el-input
              placeholder="Please input"
              v-model="input"
              @change="checking"
              clearable>
          </el-input>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "quest_5",
  data() {
    return {
      rightAnswer: this.item.responses[0].text,
      input: '',
    }
  },
  props: ['item', 'index', 'userAnswers'],
  methods: {
    checking: function (obj) {
      if (obj.toLowerCase() === this.rightAnswer.toLowerCase()) {
        this.userAnswers[this.index] = 1;
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