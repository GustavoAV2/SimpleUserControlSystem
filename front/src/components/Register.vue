<template>
    <div class="container">
        <div class="register">
            <p>Email</p>
            <input class="input-email" v-model="user.email" type="text">        
            <br>
            
            <p>Password</p>
            <input class="input-password" v-model="user.password" type="password">
            <br>
                    
            <p>Confirm password</p>
            <input class="input-password" v-model="confirm_password" type="password">
            <br>
            
            <button @click="save()" class="btn btn-primary">Save</button>
            <br><br>

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
            confirm_password: null,
            user:{
                name: null,
                email: null,
                password: null
            },
            message:{
                content: null,
                type: null
            }
        }
    },

    methods:{
        save(){
            if (this.confirm_password == this.user.password){
                User.create(this.user).then(() => {
                    this.user.name = null
                    this.user.email = null
                    this.user.password = null
                    this.message.content = "Registered successfully!"
                    this.message.type = "alert alert-success"
                }).
                catch(error =>{
                    console.log(error.response)
                    this.message.content = "Registered fail!"
                    this.message.type = "alert alert-danger"
                })
            }
            else{
                this.message.content = "Passwords are not the same!"
                this.message.type = "alert alert-danger"
            }
        }
    }
}
</script>

<style scoped>
.register{
    padding-top: 5%;
    padding-bottom: 5%;
    margin-top: 10%;
    margin-right: 20%;
    margin-left: 20%;
    box-shadow: 0 0 1em black;
}
.container{
    text-align: center;
    justify-content: center;
    border-radius: 1px;
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
.alert{
    margin-top: 12%;
    width: 20%;
    display: inline;
    text-align: center;
}
</style>
