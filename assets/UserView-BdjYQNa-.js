import{d as h,p as w,c,a as e,b as p,e as i,t as v,u as g,f as k,o as n,g as b,r as f,h as B,i as C}from"./index-uzAuNrtK.js";const P={class:"community-header"},$={class:"community-header-titleblock"},I={class:"community-header-icon avatar"},N=["src"],U={class:"community-header-title"},V=h({__name:"UserHeader",props:{user:{}},setup(d){const r=d,u=w(r.user.person_view.person);function o(){return r.user.person_view.person.display_name?r.user.person_view.person.display_name:r.user.person_view.person.name}return(s,t)=>(n(),c("div",P,[e("div",$,[e("div",I,[s.user.person_view.person.avatar?(n(),c("img",{key:0,src:s.user.person_view.person.avatar},null,8,N)):i("",!0)]),e("div",U,[e("h1",null,v(o()),1),e("p",null,v(g(u)),1)])]),t[0]||(t[0]=e("div",null,[e("h3",null,"Moderates")],-1)),s.user.person_view.person.bio?(n(),p(k,{key:0,title:"Bio",class:"person-header-bio",source:s.user.person_view.person.bio},null,8,["source"])):i("",!0)]))}}),E=h({__name:"UserView",setup(d){var _;const u=(_=b().params.personIdentifier)==null?void 0:_.toString(),o=C(),s=o==null?void 0:o.appContext.config.globalProperties.$client,t={username:u},a=f(),l=f();async function y(){a.value=await s.getPersonDetails(t),l.value={v:"Person",id:a.value.person_view.person.id}}return y(),(D,m)=>(n(),c("div",null,[e("header",null,[a.value?(n(),p(V,{key:0,user:a.value},null,8,["user"])):i("",!0)]),l.value?(n(),p(B,{key:0,"feed-location":l.value},null,8,["feed-location"])):i("",!0),m[0]||(m[0]=e("div",{style:{"min-height":"100vh"}},null,-1))]))}});export{E as default};
