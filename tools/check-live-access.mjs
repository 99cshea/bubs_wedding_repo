process.loadEnvFile(new URL('../.env.local',import.meta.url));
for(const model of ['gpt-live-1','gpt-6-luna']){
 try{const response=await fetch('https://api.openai.com/v1/models/'+model,{headers:{Authorization:'Bearer '+process.env.OPENAI_API_KEY},signal:AbortSignal.timeout(15000)});let result={};try{result=await response.json()}catch{}console.log(JSON.stringify({model,status:response.status,available:response.ok,errorCode:result.error?.code||null}));}catch(error){console.log(JSON.stringify({model,status:'network_error',code:error.cause?.code||error.code||null}));process.exitCode=1;break;}
}
