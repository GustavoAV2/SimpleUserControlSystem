<template>
    <div class="container">    
        <div class="login">
            <p>Email</p>
            <input v-model="user.email" type="text">

            <p>Password</p>
            <input v-model="user.password" type="password">
            <br>

            <button @click="loginUser()" class="btn btn-primary">Login</button>
            <br><br>

            <div class="spinner-border text-info" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
            </div>

            <div v-if="message.content" :class="message.type" role="alert">
                {{message.content}}
            </div>
        </div>
    </div>
</template>

<script>
import User from '../services/users'

export default {
    data(){
        return{
            loading: false,
            message: {content:null, type:null},
            user:{
                email:null,
                password:null
            }
        }
    },
    methods: {
        loginUser(){
            this.loading = true
            this.message.content = null
            User.login(this.user).then(response => {
                localStorage.setItem('token', response.data.access_token)
                this.$router.push('/')
            }).
            catch(error => {
                console.log(error)
                this.message.content = "Incorrect credentials!"
                this.message.type = "alert alert-danger"
            }).
            finally(() => this.loading = false)
        }
    }

}
</script>

<style scoped>
.spinner-border{
    margin-top: 5%;
}
.btn-primary{
    margin-top: 1.5%;
}
input {
    background-color: white;
    width: 50%;
    margin-bottom: 1.5%;
    text-align: center;
    color: black;
    border: none;
    outline: none;
    border-radius: 1px;
    border-bottom: 2px solid black;
}
input:focus {
    transition: 0.3s;
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    color: black;
    border-bottom: 2px solid #5fa8d3;
    background-color: white;
}

.login{
    background-color: white;
    border-radius: 1px;
    padding-top: 5%;
    padding-bottom: 5%;
    margin-top: 10%;
    margin-right: 20%;
    margin-left: 20%;
    box-shadow: 0 0 1em black;
}
.alert{
    display: inline;
    width: 50%;
    text-align: center;
}
</style>    