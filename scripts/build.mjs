import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {parseEnv} from 'node:util';
const allowed=['VITE_CONTACT_EMAIL','VITE_SUPABASE_URL','VITE_SUPABASE_PUBLISHABLE_KEY'];
let local={};try{local=parseEnv(await (await import('node:fs/promises')).readFile('.env.local','utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
const publicEnv=Object.fromEntries(allowed.map(k=>[k,process.env[k]||local[k]||'']));
if(publicEnv.VITE_SUPABASE_PUBLISHABLE_KEY.startsWith('sb_secret_'))throw new Error('A secret key cannot be bundled into the website.');
import {cp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await build({entryPoints:['src/main.jsx'],bundle:true,outfile:'dist/app.js',format:'iife',minify:true,jsx:'automatic',target:['es2022'],define:{'process.env.NODE_ENV':'"production"','import.meta.env':JSON.stringify(publicEnv)},legalComments:'eof'});
const version=createHash('sha256').update(await readFile('dist/app.js')).update(await readFile('dist/app.css')).digest('hex').slice(0,12);
const template=await readFile('index.html','utf8');
await writeFile('dist/index.html',template.replace('<script type="module" src="/src/main.jsx"></script>',`<link rel="stylesheet" href="./app.css?v=${version}"><script defer src="./app.js?v=${version}"></script>`));
await writeFile('dist/.nojekyll','');
console.log('React build ready in dist/ — portable files for GitHub Pages and local preview.');
