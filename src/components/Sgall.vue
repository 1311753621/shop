<template>
  <div class="sg_all">
    <el-card>
      <div class="sg_list">
        <van-card
          v-for="(item, key) in allshop"
          :key="key"
          @click="addshopcarts(item)"
          :num="item.product_num"
          :price="item.product_price"
          :desc="item.product_intro"
          :title="item.product_name"
          :thumb="'http://47.115.85.237:3000/' + item.product_picture"
        >
        </van-card>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allshop: "",

      xinaddshop: "",
      shopcart: {
        user_id: "",
        product_id: "",
      },
    };
  },
  created() {},
  mounted() {
    this.getshoplist();
  },
  methods: {
    //获取全部商品
    async getshoplist() {
      let { data: res } = await this.$http.post("/product/getAllProduct");
      this.allshop = res.Product;
    },
    //点击商品加入购物车
    addshopcarts(info) {
      console.log(this.$store.state.Badge[0].user_id);
      console.log(info.product_id);
      this.shopcart.product_id = info.product_id;
      this.shopcart.user_id = this.$store.state.Badge[0].user_id;
      this.addshopcart();
      this.$router.push("/cart");
    },

    async addshopcart() {
      let { data: res } = await this.$http.post(
        `/user/shoppingCart/addShoppingCart`,
        this.shopcart
      );
      console.log(res);

      if (res.code === "001") {
        this.xinaddshop = res.shoppingCartData;
        var index=this.$store.state.cart.findIndex((item,key)=>{
              return item.id==this.xinaddshop.id
        })
        if(index==-1){
            var obj3={
                id:this.xinaddshop.id,
                product_id:this.xinaddshop.product_id,
                productName:this.xinaddshop.productName,
                price:this.xinaddshop.price,
                num:1,
                productImg:this.xinaddshop.productImg
            }
                this.$store.commit("addshopcart",obj3)
            }else{
                this.$store.commit("jia",index)
            }
       
        //this.$store.commit("addshopcart", obj3);
      }
    },
  },
};
</script>
<style scoped>
.sg_list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.van-card {
  width: 300px;
  height: 150px;
  margin: 15px;
}
</style>
