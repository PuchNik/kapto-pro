import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const assets=JSON.parse(await readFile(new URL('../assets-manifest.json',import.meta.url),'utf8'));
const base=new URL('../public/original/',import.meta.url);
for(const asset of assets){const target=new URL(asset.path.split('/').map(encodeURIComponent).join('/'),base);let bytes;try{bytes=await readFile(target)}catch{if(asset.path==='download/rou_17.pdf'){try{bytes=await readFile(new URL('../.asset-cache/rou_17.pdf',import.meta.url))}catch{}}}if(bytes&&createHash('sha256').update(bytes).digest('hex')===asset.sha256)continue;const res=await fetch('https://www.kapto.pro/'+asset.path.split('/').map(encodeURIComponent).join('/'));if(!res.ok)throw new Error(asset.path+': '+res.status);bytes=Buffer.from(await res.arrayBuffer());if(createHash('sha256').update(bytes).digest('hex')!==asset.sha256)throw new Error('Source asset changed: '+asset.path);await mkdir(path.dirname(fileURLToPath(target)),{recursive:true});await writeFile(target,bytes)}
