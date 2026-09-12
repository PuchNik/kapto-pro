export const documentPath='/original/download/rou_17.pdf';
export const size=37233952;
const partSize=8*1024*1024;
export async function serveDocument(request,assets){
 if(!['GET','HEAD'].includes(request.method))return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
 let start=0,end=size-1,status=200;
 const range=request.headers.get('range');
 if(range){const match=/^bytes=(\d*)-(\d*)$/.exec(range);if(!match||(!match[1]&&!match[2]))return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});if(!match[1])start=Math.max(0,size-Number(match[2]));else {start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=size)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});status=206;}
 const headers=new Headers({'Content-Type':'application/pdf','Content-Length':String(end-start+1),'Accept-Ranges':'bytes','Content-Disposition':'inline; filename="rou_17.pdf"'});
 if(status===206)headers.set('Content-Range',`bytes ${start}-${end}/${size}`);
 if(request.method==='HEAD')return new Response(null,{status,headers});
 let part=Math.floor(start/partSize);const last=Math.floor(end/partSize);
 const stream=new ReadableStream({async pull(controller){try{const res=await assets.fetch(new Request(`https://assets.local/document-parts/rou_17-${part}.bin`));if(!res.ok)throw new Error('Document part unavailable');const bytes=new Uint8Array(await res.arrayBuffer());const from=Math.max(0,start-part*partSize);const to=Math.min(bytes.length,end-part*partSize+1);controller.enqueue(bytes.subarray(from,to));part++;if(part>last)controller.close();}catch(error){controller.error(error);}}});
 return new Response(stream,{status,headers});
}
