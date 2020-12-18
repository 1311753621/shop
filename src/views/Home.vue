<template>
    <div class="sg_home">
            <header class="sg_header">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <span v-if="!deng" @click="login">登录/注册</span>
                        <span v-else @click="loginout">欢迎{{$store.state.Badge[0].userName}}</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="getorder">我的订单</el-menu-item>
                    <el-menu-item index="3"  @click="getorder">我的收藏</el-menu-item>
                    <el-menu-item index="4" @click="getcart" v-if="!deng">我的购物车(0)</el-menu-item>
                    <el-menu-item index="4" @click="getcart" v-else>我的购物车({{$store.state.cart.length}})</el-menu-item>

                </el-menu>
            </header>
            <section class="sg_box">
                <el-row :gutter="20">
                    <el-col :span="16" class="sg_text">
                            <h1>shoppe</h1>
                            <el-menu
                                    class="el-menu-demo1"
                                    mode="horizontal"
                                    @select="handleSelect"
                                    text-color="#000"
                                    active-text-color="blue">
                                    <el-menu-item index="1"><router-link to="/all">首页</router-link></el-menu-item>
                                    <el-menu-item index="2"><router-link to="/allshop">全部商品</router-link></el-menu-item>
                                    <el-menu-item index="3"><router-link to="/allwe">关于我们</router-link></el-menu-item>
                                </el-menu>
                    </el-col>
                    <el-col :span="8"> 
                        <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input></el-col>
                </el-row>
            </section>
            <footer>
                <router-view></router-view>
            </footer>
             <el-dialog
                title="登录"
                :visible.sync="dialogVisible"
                width="30%"
                >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName" class="sg_ipt"></el-input>
                    </el-form-item>
                     <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" class="sg_ipt"></el-input>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </el-form-item>
                </el-form>
                </el-dialog>
    </div>
   
</template>

<script>
export default {
    data() {
        return {
            token:'admin',
            activeIndex:1,
            dialogVisible:false,
            deng:sessionStorage.getItem('deng') ||false, //判断是否登录
            ruleForm:{
                userName:'jiyun',
                password:'password'
            },
            rules:{
                 userName: [
                            { required: true, message: '请输入用户名', trigger: 'blur' },
                            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                password:[
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ]
            },
            user:'',
        };
    },
    created() {

    },
    mounted() {
       
    },
    methods: {
        handleSelect(){
        },
        //登录效验
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
            if (valid) {
               
            let {data:res}= await this.$http.post('/users/login',this.ruleForm)
            console.log(res)
            this.user=res.user
           // console.log(this.user)
            if(res.msg=='登录成功'){
                this.deng=true
                sessionStorage.setItem('token',this.token)
                sessionStorage.setItem('deng',this.deng)
                this.getusername()
                this.getcarlist()
                console.log(this.$store.state.Badge[0].userName)
            }else{
                this.deng=false
            }
            this.dialogVisible=false
            } else {
                console.log('error submit!!');
                return false;
            }
            });
      },
     
      //用户名传到vuex
       getusername(){
             var index=this.$store.state.Badge.findIndex((item,key)=>{
                return item.id==this.user.user_id
            })
            if(index==-1){
                var obj={
                    user_id:this.user.user_id,
                    userName:this.user.userName,
                }
            
            this.$store.commit('getusername',obj)
         }else{
             return 
         }
       },
          //点击登录按钮显示登录界面
        async login(){
             this.dialogVisible=true
        },
        async getcarlist(){
            let {data:res} =await this.$http.post('/user/shoppingCart/getShoppingCart',this.user)
            console.log(res)
            var obj=res.shoppingCartData
            var obj2=JSON.parse(JSON.stringify(obj))
            this.$store.commit("getcarlist",obj2)
            
        },
        //点击退出
        loginout(){
                this.dialogVisible=false
                 this.$confirm('确定退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    sessionStorage.removeItem('token')  
                    sessionStorage.removeItem('deng')  
                    this.deng=false
                    this.$store.commit('loginout')
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });       
                  
                    });
                   
        },
        //点击我的订单，我的收藏
        getorder(){
              if(!this.deng){
                this.dialogVisible=true
                }
        },
        //点击购物车
        getcart(){
            //判断是否登录
            if(!this.deng){
                this.dialogVisible=true
            }else{
                this.$router.push('/cart')
            }
        }
    
    }
};
</script>

<style scoped>
.sg_home{
    width: 100%;
    height: 100%;
}
.sg_header{
    width: 100%;
    height: 60px;
    background-color:#545c64;
}
.el-menu.el-menu--horizontal{
    border: none;
}
.el-menu-demo{
    margin-left: 800px;
}
.el-input{
    width: 350px;
    margin-top: 10px;
}
.sg_box{
    width: 100%;
   
}
.el-menu-demo1{
    width: 400px;
}
.sg_ipt{
    width: 200px;
}
.el-button{
    width: 200px;
}
.sg_text{
    display: flex;
    justify-content: space-between;
}
h1{
    font-size: 40px;
    margin: 10px 0px 0px 200px;
    color: red;
}

</style>

