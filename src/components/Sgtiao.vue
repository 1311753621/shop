<template>
    <div class="sg_phone">
         <el-card>
          <div class="sg_list">
                <van-card
                    v-for="(item,key) in phone" :key="key"
                        :num="item.product_num"
                        :price="item.product_price"
                        :desc="item.product_intro"
                        :title="item.product_name"
                        :thumb="'http://47.115.85.237:3000/'+item.product_picture"
                        />  
          </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
                allshop:'',
                phone:''
        };
    },
    created() {

    },
    mounted() {
         this.getshoplist()
    },
    methods: {
        //获取全部商品
                async getshoplist(){
                    let {data:res} =await this.$http.post('/product/getAllProduct')
                //  console.log(res)
                    this.allshop=res.Product
                   
                    this.phone=[]
                    this.allshop.map((item)=>{
                        if(item.category_id==3){
                            this.phone.push(item)
                        }
                    })
                }
    }
};
</script>

<style scoped>
 .sg_list{
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  }
  .van-card{
      width: 100%;
      height: 100px;
      margin: 15px;

  }
</style>

