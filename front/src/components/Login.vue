<template>
    <div class="container">    
        <div class="login">
            <p>Email</p>
            <input v-model="user.email" type="text">

            <p>Password</p>
            <input v-model="user.password" type="password">
            <br>

            <button @click="loginUser()" class="btn btn-primary">Login</button>
            <br>

            <div class="spinner-border text-info" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
            </div>

            <transition v-if="message.content" name="slide" mode="out-in" appear>
                <div :class="message.type" role="alert">
                    {{message.content}}
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import User from '../services/users'
import alertMixin from '../services/alertMixin'

export default {
    mixins:[alertMixin],

    data(){
        return{
            loading: false,
            user:{
                email:null,
                password:null
            }
        }
    },
    
    methods: {
        loginUser(){
            this.loading = true
            User.login(this.user).then(response => {
                // localStorage.setItem('token', JSON.stringfy({'token': response.data.access_token}))
                localStorage.setItem('token', response.data.access_token)
                this.$router.push('/')
            }).
            catch(() => {
                this.generateMessage("Incorrect credentials!", "alert alert-danger")
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
.alert-danger{
    margin-right: 150px;
    margin-left: 150px;
}
.btn-primary{
    margin-bottom: 15px;
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
.login{
    background-color: white;
    border-radius: 1px;
    padding: 40px;
    margin: 200px;
    margin-top: 50px;
}   

/* Animação */
input:focus {
    transition: 0.3s;
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
    color: black;
    border-bottom: 2px solid #5fa8d3;
    background-color: white;
}
@keyframes slide-in{
  from { transform:  translateY(40px);}
  to { transform:  translateY(0);}
}
@keyframes slide-out{
  from { transform:  translateY(0);}
  to { transform:  translateY(40px);}
} 
.slide-enter-active{
  animation: slide-in 2s ease;
  transition: opacity 2s;
}
.slide-leave-active{
  animation: slide-out 2s ease;
  transition: opacity 2s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
}
</style>    