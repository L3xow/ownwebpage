<template>
    <div class="blog">
        <nav>
            <ul class="nav-list">
                <li><router-link class="nav-links" to="/">Home</router-link></li>
                <li><router-link class="nav-links" to="about">About</router-link></li>
                <li><router-link class="nav-links" to="blog">Blog</router-link></li>
            </ul>
        </nav>
    </div>

    <div class="home content-wrapper">
        <div v-for="post in posts" :key="post.meta.id">
            <router-link :to="`/blog/${post.fields.slug}`">
                <article>
                    <div class="image">
                        <img :alt="post.fields.title" :src="`${post.fields.image[0].fields.file.url}?w=840&h=400&fit=crop`">
                    </div>
                    <h2> {{ post.fields.title }}</h2>
                </article>
            </router-link>
        </div>
    </div>

</template>

<script>
    import { comfortable } from '../comfortable';

    export default {
        name: 'blog',
        data() {
            return {
                posts: [],
            }
        },
        methods: {
            getPosts() {
                this.loading = true;

                const options = {
                    embedAssets: true,
                    offset: this.posts.length
                };

                comfortable.getCollection('blogpost', options)
                .then(result => {
                    this.posts.push(...result.data);
                    this.totalPosts = result.meta.total;
                    this.loading = false;
                    console.log(this.posts);
                })
                .catch(err => {
                    this.loading = false;
                    throw err;
                })
            }
        },
        created() {
            this.getPosts();
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

    article {
        margin-bottom: 42px;
        text-align: center;
    }
    article .image {
        height: auto;
        width: 100%;
    }
    article .image img {
        max-width: 100%;
        height: auto;
    }
    article h2 {
        color: #2d2d33;
    }
    .home article {
        border: 1px solid #ccc;
    }
    .home article h2 {
        margin-left: 21px;
    }
</style>