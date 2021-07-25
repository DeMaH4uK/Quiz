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
          <el-upload
              class="upload-demo"
              drag
              action="http://localhost:3000/test"
              :before-upload="check"
              :headers="headers">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Перетащите файл суда или <em>нажмите для загрузки</em></div>
            <div class="el-upload__tip" slot="tip">Файл в формате txt</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// import state from '../store/index'

export default {
  name: "quest_7",
  props: ['item', 'index', 'userAnswers'],
  data() {
    return {
      headers: {
        // Authorization: `Bearer ${state.getters.TOKENS.accessToken}`
      },
    };
  },
  methods: {
    check: function(file) {
      // console.log(file);
      switch (file.type.toLowerCase()) {
        // case ("image/jpg").toLowerCase():
        case ("text/plain").toLowerCase():
          if (file.name.split('.').slice(0, -1).join('.').toLowerCase() === this.item.responses[0].text.toLowerCase()) {
            // console.log("yes");
            this.userAnswers[this.index] = 1;
          }
          else {
            alert("Неправильное имя файла!");
            this.userAnswers[this.index] = 0;
            return false;
          }
          break;

        default:
          alert("Это не текстовый файл (txt) файл!");
          this.userAnswers[this.index] = 0;
          return false;
      }
    }
  },
  // mounted() {
  //   console.log("file.name.very.png".split('.').slice(0, -1).join('.'));
  // }
}
</script>

<style>
</style>