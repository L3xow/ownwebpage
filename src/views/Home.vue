<template>
  <div class="home">
    <div class="navigation_home">
      <nav>
        <router-link to="/About">
          <div class="navigation_aboutme">
            About Me
          </div>
        </router-link>
      </nav>
    </div>
    <div class="navigation_footer">
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>


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

</style>
