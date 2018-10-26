<template>
  <!--background: url(https://res.cloudinary.com/dmglopmul/image/upload/v1540531394/projectPhotos/githubfinder/github.jpg);background-repeat: no-repeat;background-size: cover;-->
  <div class="searchme" style="display: flex;justify-content: center;margin: 10px;">
    <div class='wrap'>
      <form class="
    myForm">
        <label class="label purpleLabel" for="fname"><i class="fab fa-github-square fa-3x"></i>Username: </label>
        <input class="myInput" type="text" placeholder="DanSimonson" v-model="username" />
        <!--<input type="submit" value="Octocat~me" class="button" v-on:click="chainPromises(username)">-->
        <span><a class="button" v-on:click="chainPromises(username)">Octo~Search</a></span>
      </form>
    </div>
    <div class="
            box showMe" v-if="showMe">
      <div class="imgBx label purpleLabel">
        <img v-bind:src="showMe.avatar_url" />
        <span v-if="showMe.blog"><a class="button" v-bind:href="showMe.blog" target="_blank">Website</a></span>
        <br>
        <span v-if="showMe.html_url"><a class="button" v-bind:href="showMe.html_url" target="_blank">Profile</a></span>
      </div>
      <div class="content blueLabel">
        <div class="label" v-if="showMe.name">Name: {{ showMe.name }}</div>
        <div class="label" v-if="showMe.bio">Bio~ {{ showMe.bio }}</div>
        <div class="label" v-if="showMe.location">Living in: {{ showMe.location }}</div>
        <div class="label" v-if="showMe.followers">Followers: {{ showMe.followers }}</div>
        <div class="label" v-if="showMe.following">Following: {{ showMe.following }}</div>
      </div>
    </div>

    <div class='wrapContainer' style="display:flex; justify-content:center; background: red;background-size:cover;">
      <span class="repos label blueLabel" v-if="showMe">Latest Repositories</span>
      <v-container grid-list-xl>
        <v-layout align-items-stretch row wrap>
          <v-flex pl-4 sm12 lg3 v-for="(repo,index) in showRepos" :key="repo.id" v-if="index <= limit">
            <v-card align-content-end color="#9068be" class="white--text" height="100%">
              <v-img src="https://res.cloudinary.com/dmglopmul/image/upload/v1540531394/projectPhotos/githubfinder/github.jpg"
                aspect-ratio="2.75"></v-img>
              <v-card-title primary-title>
                <div class="headline">Repository Name: {{ repo.name }}</div>
              </v-card-title>
              <v-card-title>
                <div>Description: {{repo.description}}</div>
              </v-card-title>
              <v-card-actions>
                <v-btn :href="repo.html_url" target="_blank" rounded color="#e62739" class="white--text">View
                  Repository</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <div v-if="showMe" class="arrowDown" v-bind:style="{ opacity: activeOpacity }"></div>
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
        username: '',
        limit: 5,
        scrolled: false,
        activeOpacity: ''
      }
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      chainPromises(username) {
        axios.get('https://api.github.com/users/' + username)
          .then((response) => {
            console.log('Response', response);
            this.showMe = response.data
            return axios.get('https://api.github.com/search/repositories?q=user:' + username + '+sort:updated-desc')
            //return axios.get('https://api.github.com/search/repositories?q=user:DanSimonson+sort:updated-desc')
            //return axios.get('https://api.github.com/users/' + username + '/repos'); // using response.data
          })
          .then((response) => {
            console.log('Response', response.data.items);
            this.showRepos = response.data.items
            //return axios.get('https://api.github.com/search/repositories?q=user:DanSimonson+sort:author-date-asc')
            //https://api.github.com/search/repositories?q=user:km-poonacha+sort:author-date-asc
          });
        //clear the input box after submit
        //this.username = '';

      },
      handleScroll() {
        this.scrolled = window.scrollY < 20;
        //console.log("scrollY: ", window.scrollY)
        /*if (window.scrollY < 20) {
          this.activeOpacity = .5
        } else if (window.scrollY < 60) {
          this.activeOpacity = .8
        } else if (window.scrollY < 80) {
          this.activeOpacity = 1
        }*/
        if (this.scrolled) {
          this.activeOpacity = 1;
        } else {
          this.activeOpacity = 0;
        }
      }
    }
  }
</script>

<style scoped>
  .arrowDown {
    /*width: 200px;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    bottom: 30%;
    left: 48%;
    transform: translate(-50%, -50%);*/
  }

  .arrowDown::after {
    content: "";
    width: 40px;
    height: 40px;
    position: absolute;
    margin: auto;
    top: 0%;
    right: 0;
    bottom: 0;
    left: 0;
    border-right: 4px solid #66BB6A;
    border-bottom: 4px solid #66BB6A;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: 3s arrow infinite ease;
    animation: 3s arrow infinite ease;
  }

  .arrowDown[data-v-5a792970] {}

  @-webkit-keyframes arrow {

    0%,
    100% {
      top: 50px;
    }

    50% {
      top: 80px;
    }
  }

  @keyframes arrow {

    0%,
    100% {
      top: 50px;
    }

    50% {
      top: 80px;
    }
  }

  .headline {
    font-size: 1.2em !important;
  }

  .label {
    color: #fdfdfd;
    padding: 2px;
    font-family: Arial;
  }

  .blueLabel {

    background-color: #6ed3cf;
    /*#e7e7e7;*/
    border-radius: 8%;
  }

  .purpleLabel {
    background-color: #9068be;
    /*#e7e7e7;*/
    border-radius: 8%;
  }

  .redLabel {
    background-color: #e62739;
    /*#e7e7e7;*/
    border-radius: 8%;

  }

  /* Gray */
  .button {
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    font: menu;
    color: #fdfdfd;
    ;
    background: #e62739;
    /* ButtonText;*/
    display: inline-block;
    padding: 2px 8px;
    margin-top: 5px;
    transition: .3s
  }

  .button:hover {
    background-color: #F06292;
    color: #fdfdfd;
  }

  div.searchMe {
    position: relative;
    background: url(https://res.cloudinary.com/dmglopmul/image/upload/v1540529604/projectPhotos/githubfinder/github.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

  }

  form.myForm {
    /*border: 2px solid red;*/
    background: #e1e8f0;
    padding: 3px;
    width: 500px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    /*font-size: 1.2em;*/
  }

  label {
    width: 200px;
    margin: 0 auto;
    display: block;
  }

  input[type=text] {
    padding: 12px 20px;
    margin: 0 auto;
    /*margin: 8px 0;*/
    box-sizing: border-box;
    display: block;
    width: 200px;
    text-align: center;
    background: #6ed3cf;
    /*#e1e8f0;*/
    color: #fdfdfd;
    border-radius: 8%;
  }

  .searchMe {
    position: relative;
    height: 100vh;

  }

  .box {
    background: #e1e8f0;
  }


  /*.box .imgbx*/
  .box .imgBx {
    width: 100px;
    flex: 0 0 100px;
    text-align: center;
    padding: 5px;
  }

  .box .imgBx img {
    max-width: 100%;
  }

  .box .content {
    padding-left: 20px;
    border: 1px solid #6ed3cf;
  }

  .box .content h2 {
    margin: 0;
    padding-left: 20px;
    color: #696969;
    font-size: 22px;
  }

  .content {
    margin: 0;
    padding: 10px 0 0;
    text-align: inherit;
  }


  /*img {
    max-width: 100px;
  }*/

  .repos {
    /*position: absolute;
    top: 100%;
    Left: 50%;
    transform: translate(-50%, -50%);*/
    width: 200px;
    text-align: center;
  }

  div.container.grid-list-xl {
    background: #e1e8f0;

  }



  /*media Queries*/
  @media only screen and (min-width: 320px) {
    form.myForm {
      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      /*border: 5px solid red;*/
      margin-top: 40px;
      padding: 20px;
    }

    .box {
      position: absolute;
      top: 50%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 320px;
      display: flex;
      justify-content: center;
      margin-top: 45px;
      padding: 20px;
    }


    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 88%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2px;
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 12%;
      left: 44%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {

      margin-top: 400px;
      margin-right: 38px;
      position: absolute;
      top: 68%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }

  @media only screen and (min-width: 768px) {
    form.myForm {
      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      margin-top: 40px;
      padding: 20px;
    }

    .box {
      position: absolute;
      top: 46%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 520px;
      display: flex;
      justify-content: center;
      margin-top: 30px;

    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 73%;
      Left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 5px;
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 28%;
      left: 44%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {

      margin-top: 390px;
      margin-right: 38px;
      position: absolute;
      top: 65%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }


  @media only screen and (min-width: 1024px) {
    form.myForm {

      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      margin-top: 40px;
      padding: 20px;

    }

    .box {
      position: absolute;
      top: 45%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 520px;
      display: flex;
      justify-content: center;
      margin-top: 38px
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 72%;
      Left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 10px;
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 27%;
      left: 46%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {

      margin-top: 400px;
      margin-right: 38px;
      position: absolute;
      top: 70%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }

  @media only screen and (min-width: 1280px) {
    form.myForm {

      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      margin-top: 40px;
      padding: 20px;
    }

    .box {
      position: absolute;
      top: 45%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 720px;
      display: flex;
      justify-content: center;
      margin-top: 38px
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 75%;
      Left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 10px;
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 24%;
      left: 46%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {

      margin-top: 400px;
      margin-right: 38px;
      position: absolute;
      top: 38%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }


  @media only screen and (min-width: 1440px) {
    form.myForm {

      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      margin-top: 40px;
      padding: 20px;
    }

    .box {
      position: absolute;
      top: 52%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 920px;
      display: flex;
      justify-content: center;
      margin-top: 25px;

    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 80%;
      Left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 15px;
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 18%;
      left: 48%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {
      margin-top: 422px;
      margin-right: 38px;
      position: absolute;
      top: 38%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }


  @media only screen and (min-width: 1600px) {
    form.myForm {
      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      margin-top: 20px;
    }

    .box {
      position: absolute;
      top: 40%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 1020px;
      display: flex;
      justify-content: center;
      margin-top: 40px
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 65%;
      Left: 50%;
      transform: translate(-50%, -50%);
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 34%;
      left: 48%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {
      margin-top: 468px;
      margin-right: 38px;
      position: absolute;
      top: 25%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }


  @media only screen and (min-width: 2560px) {
    form.myForm {
      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
    }

    .box {
      position: absolute;
      top: 35%;
      Left: 50%;
      transform: translate(-50%, -50%);
      padding: 2%;
      box-sizing: border-box;
      border-radius: 4px;
      width: 1020px;
      display: flex;
      justify-content: center;
      margin-top: 10px
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .box .imgBx {
      width: 120px;
      flex: 0 0 120px;
    }

    .box .content {
      padding-left: 20px;
      border: 1px solid #6ed3cf;
    }

    .repos {
      position: absolute;
      top: 52%;
      Left: 50%;
      transform: translate(-50%, -50%)
    }

    .arrowDown {
      /*width: 200px;
    margin: 0 auto;
    text-align: center;*/
      position: fixed;
      bottom: 47%;
      left: 49%;
      transform: translate(-50%, -50%);
    }

    div.container.grid-list-xl {
      margin-top: 460px;
      margin-right: 38px;
      position: absolute;
      top: 24%;
      Left: 50%;
      transform: translate(-50%, -10%);
      padding: 20px;
    }
  }
</style>