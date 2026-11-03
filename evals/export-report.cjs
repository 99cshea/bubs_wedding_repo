const fs=require('node:fs'),path=require('node:path');
const raw=JSON.parse(fs.readFileSync(path.join(__dirname,'results.json'),'utf8')),fixtures=require('./fixtures.json');
const records=raw.results.results.map(r=>({caseId:r.testCase.vars.caseId,strategy:r.provider.id.split(':').pop(),output:JSON.parse(r.response.output),pass:r.success,score:r.score,checks:r.gradingResult.componentResults.map(c=>({id:c.assertion.config.rule,name:c.assertion.metric,pass:c.pass,score:c.score,reason:c.reason}))}));
if(records.length!==21||records.some(r=>r.checks.length!==6))throw Error('Incomplete promptfoo report');
for(const c of fixtures.cases)for(const s of fixtures.strategies)if(records.filter(r=>r.caseId===c.id&&r.strategy===s.id).length!==1)throw Error('Missing or duplicate result');
if(records.filter(r=>r.strategy==='grounded').some(r=>!r.pass))throw Error('Grounded reference outputs failed');
if(!records.some(r=>!r.pass))throw Error('Deliberate negative fixtures did not fail');
const out=path.resolve(__dirname,'../dist/evals');fs.mkdirSync(out,{recursive:true});
const report={engine:'promptfoo',version:require('./node_modules/promptfoo/package.json').version,evalId:raw.evalId,timestamp:raw.results.timestamp||raw.timestamp||new Date().toISOString(),mode:'Hand-authored recorded output replay; no live model calls.',fieldScope:'Eight core listing fields; representative subset of the onboarding schema.',keys:fixtures.keys,strategies:fixtures.strategies,cases:fixtures.cases,records};
fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
for(const file of ['grade.js','promptfooconfig.json','fixtures.json','fixture-provider.cjs','assertions.cjs','package.json','package-lock.json','run-evals.cjs','export-report.cjs','build-fixtures.cjs','README.md'])if(fs.existsSync(path.join(__dirname,file)))fs.copyFileSync(path.join(__dirname,file),path.join(out,file));
fs.copyFileSync(path.join(__dirname,'results.json'),path.join(out,'promptfoo-results.json'));
for(const strategy of fixtures.strategies){const rows=records.filter(r=>r.strategy===strategy.id);console.log(`${strategy.label}: ${rows.filter(r=>r.pass).length}/7 complete cases; ${rows.flatMap(r=>r.checks).filter(c=>c.pass).length}/42 assertions`)}
