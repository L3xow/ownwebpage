<template>
    <div class="navigation_header">
      <nav>
        <ul class="nav-list">
          <li><router-link class="nav-links" to="/">Home</router-link></li>
          <li><router-link class="nav-links" to="about">About</router-link></li>
          <li><router-link class="nav-links" to="blog">Blog</router-link></li>
        </ul>
      </nav>
    </div>
  <div class="page" v-if="page">
    <article class="content-wrapper">
      <h2> {{ page.fields.title }}</h2>
      <div class="content" v-html="page.fields.content.html">
      </div>
    </article>
  </div>
</template>


<script>

  import { comfortable } from '../comfortable'

  export default {
    name: 'page',
    data () {
      return {
        page: null
      }
    },
    methods: {
      getPage() {
        comfortable.getAlias(this.$route.params.slug)
        .then(result => {
          this.page = result;
        })
        .catch (err => {
          throw err;
        })
      }
    },
    created() {
      this.getPage();
    }
  }

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