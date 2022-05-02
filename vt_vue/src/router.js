import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index'
import Classify from './views/Classify'
import Rank from './views/Rank'
import CompleteRank from './views/CompleteRank'
import Details from './views/Details'
import Login from './views/Login'
import Register from './views/Register'
import Bookshelf from './views/Bookshelf'
import Catalog from './views/Catalog'
import Read from './views/Read'
import User from './views/User'
import Userinfo from './sub/Userinfo'
import UserTopUp from './sub/UserTopUp'
import Userset from './sub/Userset'
import History from './sub/History'
import NotFound from './views/NotFound'
//ES6

Vue.use(Router)

export default new Router({
  //mode: 'history',学习阶段不用history模式
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home,children:[
        { path:"/", component: Index },
        { path:"/index", component: Index },
        { path:"/classify", component: Classify },
        { path:"/rank", component: Rank },
        { path:"/completeRank", component: CompleteRank },
        { path:"/bookshelf", component: Bookshelf },
        { path:"/user", component: User,children:[
            {path:"/", component: Userinfo}, 
            {path:"/userinfo", component: Userinfo}, 
            {path:"/userTopUp", component: UserTopUp}, 
            {path:"/userHistory", component: History}, 
            {path:"/userset", component: Userset} 
        ] },
        { path:"/details/:bid", component: Details,props:true },
        { path:"/catalog/:bid", component: Catalog,props:true },
        //     { path:"products", component: Products },
      ]},
    { path:"/read/:bid/:p", component: Read,props:true },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/*', component:NotFound }
  ]
})
