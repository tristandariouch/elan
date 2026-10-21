import {cp,rm,writeFile} from 'node:fs/promises';
await rm('docs',{recursive:true,force:true});
await cp('dist','docs',{recursive:true});
await writeFile('docs/.nojekyll','');
console.log('GitHub Pages prêt dans docs/.');
