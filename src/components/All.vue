<template>
    <div>
        <el-card>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,key) in img" :key="key">
                   <img :src="'http://47.115.85.237:3000/'+item.imgPath" alt="">
                </van-swipe-item>
            </van-swipe>
            <div class="sg_shoplist">
                <h4>手机</h4>
                <div class="sg_list">
                        <van-card
                        v-for="(item,key) in a" :key="key"  
                        :price="item.product_price"
                        :desc="item.product_intro"
                        :title="item.product_name"
                        :thumb="'http://47.115.85.237:3000/'+item.product_picture"
                        :lazy-load=rr  
                        >
                    </van-card>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img:'',
            allshop:'',
            a:'',
            rr:true
        };
    },
    created() {
    },
    mounted() {
         this.geiswiper()
         this.getshoplist()
    },
    methods: {
        async geiswiper(){
            let {data:res} = await this.$http.post('/resources/carousel',this.img)
            this.img=res.carousel
        },
        //获取全部商品
        async getshoplist(){
            let {data:res} =await this.$http.post('/product/getAllProduct')
            this.allshop=res.Product
            let a=this.allshop.splice(0,8)
            this.a=a
        },
    }
};
</script>
<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 10px;
    text-align: center;
    background-color: #39a9ed;
  }
  .sg_list{
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  }
  .van-card{
      width: 300px;
      height: 100px;
      margin: 15px;
  }
  .van-card:hover{
      background: rgb(0,0,0,0.1);
      width: 301px;
      height: 101px;
  }
</style>
