<template>
  <div>
    <div class='container wrapAll'>
      <form>
        <label class="label" for="GitHub Username">GitHub Username</label>
        <input type="text" id="username" name="githubname" placeholder="DanSimonson" v-model="username">
        <!--<label class="label purpleLabel" for="fname"><i class="fab fa-github-square fa-3x"></i>Username: </label>
      <input class="myInput" type="text" placeholder="DanSimonson" v-model="username" />-->
        <!--<input type="submit" value="Octo~Search" class="button" v-on:click="chainPromises(username)">-->
        <a class="button" v-on:click="chainPromises(username)"><i class="fab fa-github-square fa-lg"></i>
          Octo~Search</a>
      </form>
    </div>
    <div class='container wrapContent showMe' v-if='showMe'>
      <div class="box">
        <div class="imgBx label
      purpleLabel">
          <img v-bind:src="showMe.avatar_url" />
          <span v-if="showMe.blog"><a class="button" v-bind:href="showMe.blog" target="_blank"><i class="fas fa-desktop"></i>
              Website</a></span>
          <br>
          <span v-if="showMe.html_url"><a class="button" v-bind:href="showMe.html_url" target="_blank"><i class="fas fa-male"></i>
              Profile</a></span>
        </div>
      </div>
      <div class="contentBox">
        <a class="contentLabel"> Name: {{ showMe.name }}</a>
        <!--<div class="contentLabel" v-if="showMe.name"><i class="fas fa-check fa-lg"></i> Name: {{ showMe.name }}</div>-->
        <a class="contentLabel" v-if="showMe.bio"></i> Bio~ {{ showMe.bio }}</a>
        <a class="contentLabel" v-if="showMe.location"></i> Living in: {{
          showMe.location }}</a>
        <a class="contentLabel" v-if="showMe.followers"> Followers: {{
          showMe.followers }}</a>
        <a class="contentLabel" v-if="showMe.following"> Following: {{
          showMe.following }}</a>
      </div>
    </div>
    <div v-if="showMe" class="arrowDown" v-bind:style="{ opacity: activeOpacity }"></div>




    <!--background: url(https://res.cloudinary.com/dmglopmul/image/upload/v1540531394/projectPhotos/githubfinder/github.jpg);background-repeat: no-repeat;background-size: cover;-->
    <!--<div class="searchme" style="display: flex;justify-content: center;margin: 10px;">
    <div class='wrap'>
      <form class="
    myForm">
        <label class="label purpleLabel" for="fname"><i class="fab fa-github-square fa-3x"></i>Username: </label>
        <input class="myInput" type="text" placeholder="DanSimonson" v-model="username" />
        <!--<input type="submit" value="Octocat~me" class="button" v-on:click="chainPromises(username)">-->
    <!--<span><a class="button" v-on:click="chainPromises(username)">Octo~Search</a></span>
      </form>
    </div>
    <div class="container">
      <div class="
        box showMe" v-if="showMe">
        <div class="imgBx label purpleLabel">
          <img v-bind:src="showMe.avatar_url" />
          <span v-if="showMe.blog"><a class="button" v-bind:href="showMe.blog" target="_blank">Website</a></span>
          <br>
          <span v-if="showMe.html_url"><a class="button" v-bind:href="showMe.html_url" target="_blank">Profile</a></span>
        </div>
      </div>
    </div>
    <!--<div class="
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
    </div>-->
    <!--<div class='wrapContainer' style="display:flex; justify-content:center; background: red;background-size:cover;">
      <span class="repos label blueLabel" v-if="showMe">Latest Repositories</span>-->

    <v-container grid-list-xl>
      <v-layout align-items-stretch row wrap>
        <v-flex pl-4 sm12 lg3 v-for="(repo,index) in showRepos" :key="repo.id" v-if="index <= limit">
          <v-card ripple align-content-end color="#9068be" class="white--text" height="100%">
            <v-img src="https://res.cloudinary.com/dmglopmul/image/upload/v1540531394/projectPhotos/githubfinder/github.jpg"
              aspect-ratio="2.75"></v-img>
            <v-card-title primary-title>
              <div class="headline">Latest Repo: {{ repo.name }}</div>
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
  .wrapAll {
    position: relative;
    /*border: 5px solid red;*/
    margin-top: 20px;
    height: 220px;
    display: flex;
    justify-content: center;
    background: #6ed3cf;
    border-radius: 12px;
    /*#e1e8f0;*/
  }

  /*form.myForm {
    border: 5px solid black;
    background: #e1e8f0;
    padding: 20px;
    width: 500px;

    /*text-align: center;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    z-index: 1;
    font-size: 1.2em;
  }*/

  input[type=text],
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 7px solid #9068be;
    /*#ccc;*/
    border-radius: 4px;
    box-sizing: border-box;
    color: #9068be;
  }

  /*input[type=text] {
    padding: 12px 20px;
    margin: 0 auto;
    /*margin: 8px 0;
    box-sizing: border-box;
    display: block;
    width: 200px;
    text-align: center;
    background: #6ed3cf;
    /*#e1e8f0;
    color: #fdfdfd;
    border-radius: 8%;
  }*/



  .label {
    font-family: Arial;
    width: 200px;
    padding: 2px;
    color: #9068be;
    font-size: 1.2em;
    display: block;
    padding: 2px;

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

  /* buttons */
  .octoBtn {
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    font: menu;
    color: #9068be;
    /*#fdfdfd;*/
    background: #6ed3cf;
    /* ButtonText;
    /*display: inline-block;
    padding: 5px 8px;
    margin-top: 5px;
    transition: .3s;
    font-size: 1.5em;*/

  }

  .button {
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    font: menu;
    color: #9068be;
    /*#fdfdfd;*/
    background: #6ed3cf;
    /* ButtonText;*/
    /*display: inline-block;*/
    padding: 5px 8px;
    margin-top: 5px;
    transition: .3s;
    font-size: 1.5em;
  }

  .button:hover {
    background-color: #e62739;
    color: #6ed3cf;
    /*#fdfdfd;*/
    cursor: pointer;
  }

  .arrowDown {
    width: 200px;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    bottom: 10%;
    left: 48%;
    transform: translate(-50%, -50%);
    z-index: 1;
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


  /*div.searchMe {
    position: relative;
    background: url(https://res.cloudinary.com/dmglopmul/image/upload/v1540529604/projectPhotos/githubfinder/github.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

  }*/

  /*.searchMe {
    position: relative;
    height: 100vh;

  }*/

  .wrapContent {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 10px;
    /*border: 5px solid yellow;*/
  }

  /*.box .imgbx*/
  .box {
    background: #6ed3cf;
    /*#e1e8f0;*/
    margin-right: 10px;
    padding: 5px;
    border-radius: 12px;
    /*border: 5px solid brown;*/
  }

  .box .imgBx {
    width: 300px;
    flex: 1 1 200px;
    text-align: center;
    padding: 10px;
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

  .contentBox {
    text-align: inherit;
    /*background: #e1e8f0;*/
    /*background: #6ed3cf;*/
    color: #9068be;
    background: #9068be;
    padding: 5px;
    border-radius: 12px;
    /*border: 5px solid green;*/
  }

  .contentLabel {
    /*
    color: #9068be;
    background: #6ed3cf;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 1.2em;
    /*display: block;
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    width: 50%;*/
    appearance: button;
    -moz-appearance: button;
    -webkit-appearance: button;
    text-decoration: none;
    font: menu;
    color: #9068be;
    background: #6ed3cf;
    /*ButtonText;
    display: inline-block;...*/
    padding: 20px;
    margin-top: 15px;
    margin-bottom: 15px;

    font-size: 1.2em;
    display: block;
    width: 60%;
  }

  .container.grid-list-xl {
    background-color: #6ed3cf;
    border-radius: 12px;
  }


  /*img {
    max-width: 100px;
  }*/

  /*.repos {
 
    width: 200px;
    text-align: center;
  }

  div.container.grid-list-xl {
    background: #e1e8f0;

  }*/



  /*media Queries*/
  @media only screen and (min-width: 320px) {
    .wrapContent {
      display: grid;
      grid-template-columns: 1fr;
      /*grid-column-gap: 10px;
      border: 5px solid yellow;*/
    }



    /*form.myForm {
      width: 320px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 10%;
      transform: translate(-50%, -50%);
      /*border: 5px solid red;
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
    }*/
  }

  @media only screen and (min-width: 768px) {
    .wrapContent {
      display: grid;
      grid-template-columns: 1fr 3fr;
      /*grid-column-gap: 10px;
      border: 5px solid yellow;*/
    }

    /*form.myForm {
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
    }*/
  }


  /*@media only screen and (min-width: 1024px) {
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
  }*/
</style>