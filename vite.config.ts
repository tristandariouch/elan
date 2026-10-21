import {defineConfig,loadEnv,type Plugin} from 'vite';
import {serveOffers} from './scripts/forem-api.mjs';
import type {IncomingMessage,ServerResponse} from 'node:http';

function localOffers():Plugin {
 const middleware=(req:IncomingMessage,res:ServerResponse,next:()=>void)=>{
   if(req.url?.split('?')[0]!=='/api/offers')return next();
   if(req.method!=='GET'){res.writeHead(405);res.end();return;}
   void serveOffers(req,res);
 };
 return {name:'elan-local-offers',configureServer(server){server.middlewares.use(middleware)},configurePreviewServer(server){server.middlewares.use(middleware)}};
}
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),'VITE_');
 if(env.VITE_SUPABASE_PUBLISHABLE_KEY?.startsWith('sb_secret_'))throw new Error('Une clé privée ne peut pas être publiée dans le site.');
 return {
 base:'./',
 plugins:[localOffers()],
 build:{target:'es2022',outDir:'dist',emptyOutDir:true},
 server:{host:'127.0.0.1',port:4180,strictPort:true},
 preview:{host:'127.0.0.1',port:4180,strictPort:true},
}});
