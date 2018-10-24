<template>
  <div class="searchme">
    <!--searchGitHub(username)-->
    <form v-on:submit.prevent="chainPromises(username)">
      <input type="text" placeholder="Github username" v-model="username" />
    </form>
    <div class="showMe" v-if="showMe">
      <img v-bind:src="showMe.avatar_url" />
      <h2 v-if="showMe.name">{{ showMe.name }}</h2>
      <div v-if="showMe.bio">{{ showMe.bio }}</div>
      <div v-if="showMe.location">{{ showMe.location }}</div>
      <div v-if="showMe.followers">Followers: {{ showMe.followers }}</div>
      <div v-if="showMe.following">Following: {{ showMe.following }}</div>
      <span v-if="showMe.blog"><a v-bind:href="showMe.blog">Go to website</a></span>
      <br>
      <span v-if="showMe.html_url"><a v-bind:href="showMe.html_url">Go to profile</a></span>
    </div>
    <div v-for="(repo,index) in showRepos" :key="repo.id">
      {{repo.name}}
      {{repo.html_url}}
    </div>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    name: 'SearchMe',
    data() {
      return {
        msg: 'GitHub Search',
        showMe: null,
        showRepos: null,
        username: ''
      }
    },
    methods: {

      chainPromises(username) {
        axios.get('https://api.github.com/users/' + username)
          .then((response) => {
            console.log('Response', response);
            this.showMe = response.data
            return axios.get('https://api.github.com/search/repositories?q=user:' + 'DanSimonson' + '+sort:updated-desc')
            //return axios.get('https://api.github.com/search/repositories?q=user:DanSimonson+sort:updated-desc')
            //return axios.get('https://api.github.com/users/' + username + '/repos'); // using response.data
          })
          .then((response) => {
            console.log('Response', response.data.items);
            this.showRepos = response.data.items
            //return axios.get('https://api.github.com/search/repositories?q=user:DanSimonson+sort:author-date-asc')
            //https://api.github.com/search/repositories?q=user:km-poonacha+sort:author-date-asc
          });

      }
      /*searchGitHub(username) {
        //fetch('https://github.com/DanSimonson/')
        // Make a request for a user with a given ID
        axios.get('https://api.github.com/users/' + username)
          .then((response) => {
            // handle success
            console.log('response: ', response)
            this.showMe = response.data
            console.log('showMe: ', this.showMe)
          })
          .catch((error) => {
            // handle error
            console.log(error);
          })
      },
      getRepos(username) {
        //fetch('https://github.com/DanSimonson/')
        // Make a request for a user with a given ID
        axios.get('https://api.github.com/users/' + username + '/repos')
          .then((response) => {
            // handle success
            console.log('response: ', response)
            this.showRepos = response.data
            console.log('showMe: ', this.showMe)
          })
          .catch((error) => {
            // handle error
            console.log(error);
            this.error = error;
          })

      }*/
    }
  }
</script>

<style scoped>
  img {
    float: left;
  }
</style>