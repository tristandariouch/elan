import {createRootRoute,createRoute,createRouter,createHashHistory} from '@tanstack/react-router';
import {AppLayout,RouteScreen,MissingRoute} from './App.jsx';

export function createElanRouter(){
  // Keep pre-migration bookmarks working on GitHub Pages.
  if(location.hash&&!location.hash.startsWith('#/')&&location.hash!=='#main'){
    window.history.replaceState(null,'',location.pathname+location.search+'#/'+location.hash.slice(1));
  }
  const rootRoute=createRootRoute({component:AppLayout,notFoundComponent:()=> <MissingRoute/>});
  const paths=['/','/home','/profile','/trial','/cv','/pricing','/account','/contact','/presentation','/orientation','/add-offer','/offers','/applications','/offer/$id','/dossier/$id','/send/$id','/archive/$id','/interview/$id'] as const;
  const routeTree=rootRoute.addChildren(paths.map(path=>createRoute({getParentRoute:()=>rootRoute,path,component:RouteScreen})));
  return createRouter({routeTree,history:createHashHistory(),defaultPendingMinMs:0});
}
