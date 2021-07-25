<template>
  <div>
    <h1>{{ item.question }}</h1>
    <ol>
      <li v-for="response in item.responses" :key="response.text">
        <label>
          <input type="radio"
                 v-bind:value="response.correct"
                 v-bind:name="index"
                 v-on:click="checking($event.target)">
          {{ response.text }}
        </label>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "quest_2",
  props: ['item', 'index', 'userAnswers'],
  methods: {
    checking: function (obj) {
      let countOfRightAnswers = this.item.responses.filter((elem) => elem.correct === true).length;

      let score = 1 / countOfRightAnswers;

      if (obj.value.toLowerCase() === 'true'.toLowerCase()) {
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