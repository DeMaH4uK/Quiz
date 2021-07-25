<template>
  <div>
    <h1>{{ item.question }}</h1>
    <el-checkbox-group
        v-model="selectedItems"
        :min="0"
        :max="countOfRightAnswers">
      <el-checkbox v-for="(response) in item.responses" :key="response.text" :label="response.text"
                   @change="checking" :name="`${response.correct}`"
                   style="display:block;">
        {{ response.text }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "quest_3",
  props: ['item', 'index', 'userAnswers'],
  data() {
    return {
      finalScore: 0,
      selectedItems: [],
      countOfRightAnswers: this.item.responses.filter((elem) => elem.correct === true).length
    }
  },
  methods: {
    checking: function (e, event) {
      let obj = event.target;

      let score = 1 / this.countOfRightAnswers;

      if (obj.name.toLowerCase() === 'true'.toLowerCase()) {
        if (obj.checked) {
          this.finalScore += score;
        }
        else {
          this.finalScore -= score;
        }
      }
      else {
        this.userAnswers[this.index] = 0;
      }

      this.userAnswers[this.index] = this.finalScore;

      // console.log(this.userAnswers);
    },
  },
}
</script>

<style>
</style>