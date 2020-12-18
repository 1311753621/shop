<template>
  <div class="sg_cart">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/all' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
                   
      </el-breadcrumb>
      <table>
        <tr>
          <th><button @click="checkdel">选中删除</button></th>
          <th>商品名称</th>
          <th>商品图片</th>
          <th>商品价格</th>
          <th>商品数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, key) in $store.state.cart" :key="key">
          <td>
            <input
              type="checkbox"
              :checked="item.check"
              @click="danxuan(key)"
            />
          </td>
          <td>{{ item.productName }}</td>
          <td>
            <img :src="'http://47.115.85.237:3000/' + item.productImg" alt="" />
          </td>
          <td>{{ item.price * item.num }}</td>
          <td>
            <button @click="jian(key)" :disabled="flag">-</button>{{ item.num
            }}<button @click="jia(key)">+</button>
          </td>
          <td @click="delshop(key)">X</td>
        </tr>
      </table>
      <van-submit-bar :price="$store.getters.count*100" button-text="结算" />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shop: {
        user_id: "",
        product_id: "",
        num: "",
      },
      flag: false,
      dela: {
        user_id: "",
        product_id: "",
      },
      xuan: {
        user_id: "",
        product_id: "",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    //jia
    async jia(i) {
      this.flag = false;

      this.shop.user_id = this.$store.state.Badge[0].user_id;
      this.shop.product_id = this.$store.state.cart[i].productID;
      this.shop.num = this.$store.state.cart[i].num;

      let { date: res } = await this.$http.post(
        "/user/shoppingCart/updateShoppingCart",
        this.shop
      );
      console.log(res);

      this.$store.commit("jia", i);
    },
    jian(i) {
      if (this.$store.state.cart[i].num === 1) {
        this.flag = true;
      }
      this.$store.commit("jian", i);
    },
    //点击删除
    async delshop(i) {
      this.dela.user_id = this.$store.state.Badge[0].user_id;
      this.dela.product_id = this.$store.state.cart[i].productID;

      let { data: res } = await this.$http.post(
        "/user/shoppingCart/deleteShoppingCart",
        this.dela
      );
      console.log(res);
      this.$store.commit("delshop", i);
    },
    //点击单选
    danxuan(i) {
      this.$store.commit("danxuan", i);
      this.xuan.user_id = this.$store.state.Badge[0].user_id;
      this.xuan.product_id = this.$store.state.cart[i].productID;
      console.log(this.$store.state.cart[i]);
      console.log(this.dela.product_id);
      console.log(this.dela);
    },
    async checkdel(i) {
      let { data: res } = await this.$http.post(
        "/user/shoppingCart/deleteShoppingCart",
        this.xuan
      );
      console.log(res);
      this.$store.commit("checkdel", i);
    },
  },
  computed: {
    allchecked() {
      return this.$store.state.allchecked;
    },
  },
};
</script>
<style scoped>
.sg_cart {
  width: 100%;
  height: 100%;
}
.el-card {
  width: 100%;
  height: 100%;
}
.van-card {
  width: 400px;
  height: 100px;
  margin: 15px;
}
footer {
  width: 100%;
  height: 50px;
  background: red;
}
td {
  text-align: center;
}
img {
  width: 80px;
  height: 60px;
}
h2{
  margin: 15px;
}
</style>
