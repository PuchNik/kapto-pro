import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
const original=new URL('../public/original/download/rou_17.pdf',import.meta.url);
const cache=new URL('../.asset-cache/rou_17.pdf',import.meta.url);
const folder=new URL('../public/document-parts/',import.meta.url);
let bytes;try{bytes=await readFile(original)}catch{bytes=await readFile(cache)}
await mkdir(folder,{recursive:true});
for(let offset=0,part=0;offset<bytes.length;offset+=8*1024*1024,part++)await writeFile(new URL(`rou_17-${part}.bin`,folder),bytes.subarray(offset,offset+8*1024*1024));
await mkdir(new URL('../.asset-cache/',import.meta.url),{recursive:true});
try{await rename(original,cache)}catch(e){if(e.code!=='ENOENT')throw e}
