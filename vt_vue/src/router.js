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
import Layout from './views/Layout'
import Dashboard from './views/dashboard'
import SetBooks from './views/SetBooks'
import SetBooksDetail from './views/SetBooksDetail'
import SetUser from './views/SetUser'
import NotFound from './views/NotFound'
//ES6

Vue.use(Router)

var routes=[
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
  { path: '/register', component: Register }
]

var manageRoutes={ path: '/manage', component: Layout,children:[
    { path:"/manage", component: Dashboard },
    { path:"/manage/dashboard", name:'dashboard', meta:{title:'书城概况'}, component: Dashboard },
    { path:"/manage/setBooks", name:'setBooks', meta:{title:'书籍管理'}, component: SetBooks },
    { path:"/manage/setBooksDetail", name:'setBooksDetail', meta:{title:'修改书籍信息',hidden:true}, component: SetBooksDetail },
    { path:"/manage/setWeb", name:'setWeb', meta:{title:'书城管理'}, component: User},
    { path:"/manage/setWebCarousel", name:'setWebCarousel', meta:{title:'首页轮播',parent:"setWeb"}, component: Userinfo}, 
    { path:"/manage/setWebPublish", name:'setWebPublish', meta:{title:'首页出版图书',parent:"setWeb"}, component: Userinfo}, 
    { path:"/manage/setWebRank", name:'setWebRank', meta:{title:'排行管理',parent:"setWeb"}, component: UserTopUp}, 
    { path:"/manage/setUser", name:'setUser', meta:{title:'用户管理'}, component: SetUser },
  ] 
}
var menuRoutes = getMenuRouts(manageRoutes);
sessionStorage.setItem('manageRoutes',JSON.stringify(menuRoutes));

function getMenuRouts(){
  var children=[];
  manageRoutes.children.forEach(child=>{
    if(child.meta&&!child.meta.hidden){
      if(child.meta.parent){
        var index=children.findIndex(item=>item.name===child.meta.parent);
        if(index>-1){
          if(children[index].children){
            children[index].children.push({path:child.path,name:child.name,title:child.meta.title});
          }else{
            children[index].children=[{path:child.path,name:child.name,title:child.meta.title}];
          }
        }
      }else{
        children.push({path:child.path,name:child.name,title:child.meta.title})
      }
    }
  })
  return children;
}

routes.push(manageRoutes,{ path: '/*', component:NotFound });

export default new Router({
  //mode: 'history',学习阶段不用history模式
  base: process.env.BASE_URL,
  routes 
})
