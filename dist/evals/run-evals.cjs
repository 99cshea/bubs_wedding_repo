const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const startedAt=Date.now();
const result=spawnSync(process.execPath,[path.join(__dirname,'node_modules/promptfoo/dist/src/main.js'),'eval','-c','promptfooconfig.json','--no-cache','--no-progress-bar','-o','results.json'],{cwd:__dirname,env:{...process.env,PROMPTFOO_CONFIG_DIR:path.join(__dirname,'.promptfoo'),PROMPTFOO_DISABLE_TELEMETRY:'1',PROMPTFOO_DISABLE_UPDATE:'1'},encoding:'utf8',maxBuffer:10*1024*1024,windowsHide:true});
fs.writeFileSync(path.join(__dirname,'run.log'),(result.stdout||'')+(result.stderr||''));
if(![0,100].includes(result.status))throw Error('Promptfoo execution error. Inspect evals/run.log.');
if(fs.statSync(path.join(__dirname,'results.json')).mtimeMs<startedAt-1000)throw Error('Promptfoo did not write a fresh report');
const raw=JSON.parse(fs.readFileSync(path.join(__dirname,'results.json'),'utf8'));if(raw.results.stats.errors!==0)throw Error('Promptfoo reported evaluation errors');
require('./export-report.cjs');
console.log('Promptfoo replay verified. Intentional fixture failures are retained in the report.');

