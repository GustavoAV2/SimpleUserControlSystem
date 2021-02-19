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
            <br>

            <transition v-if="message.content" name="slide" mode="out-in" appear>
                <div :class="message.type" role="alert">
                    {{message.content}}
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import User from '@/services/users'
import alertMixin from '@/mixins/alertMixin'

export default {
    mixins:[alertMixin],

    data(){
        return{
            confirm_password: null,
            loading: false,
            user:{
                email: null,
                password: null
            }
        }
    },

    methods:{
        save(){
            if (this.confirm_password == this.user.password){
                User.create(this.user).then(() => {
                    this.user.email = null
                    this.user.password = null
                    this.confirm_password = null
                    this.generateMessage("Registered successfully!", "alert alert-success")
                }).
                catch(() =>{
                    this.generateMessage("Registered fail!", "alert alert-danger")
                }).
                finally(()=>{
                    this.loading = false
                })
            }
            else{
                this.generateMessage("Passwords are not the same!", "alert alert-danger")
            }
        }
    }
}
</script>

<style scoped>
.register{
    padding: 40px;
    padding-bottom: 180px;
    margin: 200px;
    margin-top: 50px;
    text-align: center;
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
.alert-danger{
    margin-right: 150px;
    margin-left: 150px;
}
.btn-primary{
    margin-bottom: 15px;
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
