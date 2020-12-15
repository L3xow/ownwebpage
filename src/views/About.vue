<template>
  <div class="about">
    <div class="navigation_header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link tag="asdf" class="asdf" to="About">About Me</router-link>
      </nav>
    </div>
    <div class="navigation_footer"></div>
    <div class="body">
      <div class="showcase_text">
        lorem ipsum
      </div>
    </div>
  </div>
</template>




<script>

</script>





<style lang="scss" scoped>

  .about {
    position: relative;
  }

  nav {
    padding: 50px 20%;
    background-color: grey;
    color: white;
    z-index: 3;
    font-weight: bold;
    font-size: 30px;
  }

  .navigation_footer {
    z-index: 2;
    background: grey;
    padding: 50px;
    transform: skewY(-2deg);
    position: relative;
    margin-top: -50px;
  }

  .showcase_text {
    font-weight: bold;
    font-size: 20px;
    position: relative;
    top: 20px;
    left: 50px;
  }


  .asdf {
    color: red;
  }

</style>