import assert from 'node:assert/strict';
import {createGateway,groundSuggestions} from './gateway.mjs';
import fs from 'node:fs';import path from 'node:path';
const origin='http://127.0.0.1:4181',runtime=path.resolve('.voice-runtime/tests-'+Date.now());let upstreamCalls=[];
const fake=async(url,options)=>{upstreamCalls.push({url,body:options.body?JSON.parse(options.body):null});if(url.endsWith('/hangup'))return new Response(null,{status:204});if(url.endsWith('/live/sessions'))return Response.json({session:{id:'live_test_'+upstreamCalls.length},transport:{sdp:'v=0\r\nanswer'}});return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({summary:'A price was supplied.',updates:[{field:'price',value:'$100',evidence:'Price is $100.'}],follow_up:['What is the email address?']})}]}]})};
const server=createGateway({apiKey:'not-a-real-key',upstream:fake,port:4181,runtime,sessionSeconds:1});await new Promise(r=>server.listen(4181,'127.0.0.1',r));
async function call(route,body,token,requestOrigin=origin){return fetch(origin+'/api/voice/'+route,{method:body===undefined?'GET':'POST',headers:{Origin:requestOrigin,...(body===undefined?{}:{'Content-Type':'application/json'}),...(token?{Authorization:'Bearer '+token}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})})}
try{
 assert.equal((await call('status',undefined,undefined,'https://unrelated.example')).status,403);
 assert.equal((await call('session',{sdp:'v=0'})).status,401);
 const token=(await(await call('connect',{})).json()).token;
 assert.equal((await call('session',{sdp:'invalid'},token)).status,400);
 const created=await(await call('session',{sdp:'v=0\r\n',profile:{name:'Test',unknown:'ignored'}},token)).json();assert.ok(created.session.id);assert.equal(upstreamCalls[0].body.session.model,'gpt-live-1');assert.equal(upstreamCalls[0].body.session.store,false);assert.equal(upstreamCalls[0].body.session.delegation.type,'client');
 assert.equal((await call('session',{sdp:'v=0'},token)).status,409);
 const analyze={sessionId:created.session.id,delegationId:'task1',transcript:'Price is $100.',profile:{}};const a=await(await call('assist',analyze,token)).json();assert.equal(a.updates[0].field,'price');assert.equal(a.analysesUsed,1);
 const count=upstreamCalls.length;await call('assist',analyze,token);assert.equal(upstreamCalls.length,count,'duplicate task must not call API twice');
 await call('assist',{...analyze,delegationId:'task2'},token);await call('assist',{...analyze,delegationId:'task3'},token);assert.equal((await call('assist',{...analyze,delegationId:'task4'},token)).status,429);
 await new Promise(r=>setTimeout(r,1150));assert.ok(upstreamCalls.some(c=>c.url.endsWith('/hangup')),'server cutoff must hang up without the browser');
 for(let i=1;i<10;i++){const result=await(await call('session',{sdp:'v=0'},token)).json();assert.ok(result.session);await call('close',{sessionId:result.session.id},token)}assert.equal((await call('session',{sdp:'v=0'},token)).status,429,'daily start limit');
 assert.equal(JSON.parse(fs.readFileSync(path.join(runtime,'usage.json'))).starts,10);
 const grounded=groundSuggestions({summary:'x',updates:[{field:'email',value:'fake@example.com',evidence:'invented quote'},{field:'price',value:'$100',evidence:'Price is $100.'}],follow_up:[]},'Price is $100.');assert.equal(grounded.rejected,1);assert.equal(grounded.updates.length,1);
 assert.equal((await fetch(origin+'/.env.local')).status,404,'secret file must not be served');
 console.log('PASS: origin/auth checks, schema bounds, one-session limit, 3-call budget, duplicate prevention, server cutoff, persisted 10-start limit, quote grounding, and secret-file exclusion.');
}finally{await server.closeVoice();await new Promise(r=>server.close(r));}
