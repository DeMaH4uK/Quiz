<template>
  <div>
    <h1>{{ item.question }}</h1>
    <input type="text"
           v-on:change="checking($event.target)">
  </div>
</template>

<script>
export default {
  name: "quest_6",
  data() {
    return {
      rightAnswer: this.item.responses[0].text
    }
  },
  props: ['item', 'index', 'userAnswers'],
  methods: {
    checking: function (obj) {
      if (obj.value.toLowerCase() === this.rightAnswer.toLowerCase()) {
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