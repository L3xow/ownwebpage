<template>

    <div class="blogPost">
        <nav>
            <ul class="nav-list">
                <li><router-link class="nav-links" to="/">Home</router-link></li>
                <li><router-link class="nav-links" to="/about">About</router-link></li>
                <li><router-link class="nav-links" to="/blog">Blog</router-link></li>
            </ul>
        </nav>
    </div>

    <div class="post" v-if="post && author">
        <article>
            <div class="image">
                <img :alt="post.fields.title" :src="`${post.fields.image[0].fields.file.url}?w=1680&h=750&fit=crop`">
            </div>
            <div class="content-wrapper">
                <h2>{{ post.fields.title }}</h2>
                <div class="content" v-html="post.fields.content.html"></div>
                <div class="author">
                    <img :src="`${author.fields.avatar[0].fields.file.url}?w=30&h=30&fit=crop`" alt="author.fields.name"> Written by {{ author.fields.name }}
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import Comfortable from 'comfortable-javascript';
    import { comfortable } from '../comfortable.js'
    import _ from 'lodash';

    export default {
        name: 'blogPost',
        data() {
            return {
                post: null,
                author: null,
            }
        },
        methods: {
            getPost() {
                const options = {
                    embedAssets: true,
                    includes: 1,
                    filters: new Comfortable.Filter()
                        .addAnd('slug', 'equal', this.$route.params.slug)
                };

                comfortable.getDocuments(options)
                    .then(result => {
                        this.post = result.data[0];
                        this.author = _.find(result.includes.autor, { meta: { id: this.post.fields.autor.meta.id } });
                    })
                    .catch(err => {
                        throw err;
                    })
            }
        },
        created() {
            this.getPost();
        }
    }
</script>

<style>

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

    .post .image{
        width: 100%;
    }

    .post .image img{
        width: 100%;
    }

    .post .author img {
        margin-top: 10px;
    }

    .post .author img {
        display: inline-block;
        margin-bottom: -8px;
        margin-right: 10px;
        border-radius: 50%;
    }
</style>