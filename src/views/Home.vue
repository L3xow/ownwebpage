<template>
  <nav>
    <ul class="nav-list">
        <li><router-link class="nav-links" to="/">Home</router-link></li>
        <li><router-link class="nav-links" to="About">About</router-link></li>
        <li><router-link class="nav-links" to="Contact">Contact</router-link></li>
    </ul>
  </nav>
  <main></main>
  <section class="home">
    <div class="home-content">
      <div class="home-presentation">
        <h1>Welcome to my Homepage!</h1>
        <p>This is my very first Homepage!</p>
        <p>I´m happy and pleased to welcome you on my Page!</p>
      </div>
      <img class="image" src="../assets/mobile-phone-shows-the-word-create-on-a-white-table.jpg"/>
    </div>
  </section>
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

  .home-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .home {
    height: 85vh;
    position: absolute;
    width: 100%;
  }

  .image {
    height: 50vh;
    border-radius: 100vh;
  }

</style>
