<template>
  <el-card class="box-card welcome">
    <h2 class="title text-gradient">Hello! 新一代CMS管理系统 </h2>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.welcome {
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  > .title {
    margin: 0;
    margin-bottom: 30px;
  }

  .text-gradient {
    display: inline-block;
    color: #8f75da;
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#8f75da),
      to(#727cf5)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
