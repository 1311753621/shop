<template>
    <div class="sg_allshop">
           <el-card>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/all' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>全部商品</el-breadcrumb-item>
                    <el-breadcrumb-item>分类</el-breadcrumb-item>
                </el-breadcrumb>
                <el-container>
                    <el-header>
                         <div class="sg_fil">
                            <h3>分类</h3>
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-menu-item index="1"><router-link to="/sgall?id=1&name=全部">全部</router-link></el-menu-item>
                                <el-menu-item index="2"><router-link to="/sgphone?id=2&name=手机">手机</router-link></el-menu-item>
                                <el-menu-item index="3"><router-link to="/sgtv?id=3&name=电视机">电视机</router-link></el-menu-item>
                                <el-menu-item index="4"><router-link to="/sgtiao?id=4&name=空调">空调</router-link></el-menu-item>
                                <el-menu-item index="5"><router-link to="/sgall?id=5&name=洗衣机">洗衣机</router-link></el-menu-item>
                                <el-menu-item index="6"><router-link to="/sgall?id=6&name=保护膜">保护膜</router-link></el-menu-item>
                                <el-menu-item index="7"><router-link to="/sgall?id=7&name=保护屏">保护屏</router-link></el-menu-item>
                                <el-menu-item index="8"><router-link to="/sgall?id=8&name=充电宝">充电宝</router-link></el-menu-item>
                                <el-menu-item index="9"><router-link to="/sgall?id=9&name=充电器">充电器</router-link></el-menu-item>
                            </el-menu> 
                        </div>
                    </el-header>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
           </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            allshop:'',
            activeIndex:'1',
        };
    },
    created() {
    },
    mounted() { 
        this.getshoplist()
    },
    methods: {
                handleSelect() {          
                },
             //获取全部商品
            async getshoplist(){
                let {data:res} =await this.$http.post('/product/getAllProduct')
               // console.log(res)
                this.allshop=res.Product
            },    
    }
};
</script>
<style scoped>
.sg_fil{
    width: 100%;
    height: 100%;
    display: flex;
}
h3{
    margin-right: 15px;
}
.el-header{
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
