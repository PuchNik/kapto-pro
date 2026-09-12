import app from 'vinext/server/fetch-handler';
import {documentPath,serveDocument} from './large-document.mjs';
export default {
 async fetch(request:Request,env:any,ctx:any){
  if(new URL(request.url).pathname===documentPath)return serveDocument(request,env.ASSETS);
  return app.fetch(request,env,ctx);
 }
};
