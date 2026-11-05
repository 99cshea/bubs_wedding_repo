import {retrieveSite} from '../voice/site-import.mjs';
const site=await retrieveSite(process.argv[2]||'https://www.bittersweetcatering.com/');console.log(JSON.stringify({pages:site.sources.map(({url,title,text,truncated})=>({url,title,chars:text.length,truncated})),warnings:site.warnings},null,2));
