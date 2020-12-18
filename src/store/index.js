import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:'',
    Badge:[],  
    allChecked:false,
    login:''
  },
  mutations: {
        getusername(state,obj){
          state.Badge.push(obj)
          //console.log(state.Badge)
        },
        a(state,obj){
          state.login=obj
        },
        loginout(state){
          state.Badge=[]
          state.cart=[]
        },
        getcarlist(state,obj2){
          state.cart=obj2
        },
        //点击商品加入购物车
        addshopcart(state,obj3){
          state.cart.push(obj3)
        },
        addshopcarts(state,obj){
          state.cart.push(obj)
        },
        //增加数量
        jia(state,index){         
          state.cart[index].num++              
        },
        //增少数量
        jian(state,index){
            state.cart[index].num--
         
        },
        //删除商品
        delshop(state,index){
          state.cart.splice(index,1)
        },
        danxuan(state,i){
          state.cart[i].check = !state.cart[i].check
          let check = state.cart.every((item)=>{
            return item.check
          })
          state.allChecked = check
        },
        //选中删除
        checkdel(state,i){
          for(var i=0;i<state.cart.length;i++){
            if(state.cart[i].check){
              state.cart.splice(i,1)
              i--
            }
            if(state.cart.check==0){
              state.check = false
            }
          } 
        },
        //选中的价格
        // 选中的价格
    
        

  },
  actions: {
  },
  modules: {
  },
  getters:{
    count(state){
      let num = 0;
      state.cart.map((m)=>{
          if(m.check){
              num+=m.price*m.num
          }
      })
      return num
  }
  },
  plugins: [createPersistedState()]
})
