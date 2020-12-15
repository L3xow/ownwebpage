<template>
  <div class="about">
    <div class="navigation_header">
      <nav>
        <ul class="nav-list">
          <li><router-link class="nav-links" to="/">Home</router-link></li>
          <li><router-link class="nav-links" to="About">About</router-link></li>
          <li><router-link class="nav-links" to="Contact">Contact</router-link></li>
        </ul>
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


  nav {
    margin-top: -20px;
    background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
  }

  .nav-list {
    height: 10vh;
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    margin-left: auto;
    list-style: none;
  }

  .nav-links {
    text-decoration: none;
    color: black;
    font-size: 18px;
    font-weight: bold;
  }




</style>