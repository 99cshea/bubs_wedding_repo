(function(root){
const grade=(output,expected,keys,rule)=>{
 let profile;try{profile=typeof output==='string'?JSON.parse(output):output}catch{return{pass:false,score:0,reason:'Output is not valid JSON'}}
 const fields=profile?.fields||{};let failures=[];
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 if(rule==='schema'){
  if(!profile||Object.keys(profile).sort().join(',')!=='fields,follow_up')failures.push('Expected fields and follow_up only');
  if(!same(Object.keys(fields).sort(),[...keys].sort()))failures.push('Profile must contain exactly eight known field keys');
  for(const k of keys){const f=fields[k];if(!f||!['supported','missing','conflicting','unconfirmed'].includes(f.status)||!('value'in f)||!('evidence'in f))failures.push(k+': invalid field shape');else if(f.value!==null){if(k==='starting_price'&&!(typeof f.value==='number'&&Number.isFinite(f.value)&&f.value>=0))failures.push(k+': expected a nonnegative number');else if(k==='services'&&(!Array.isArray(f.value)||!f.value.every(v=>typeof v==='string')))failures.push(k+': expected string array');else if(!['starting_price','services'].includes(k)&&typeof f.value!=='string')failures.push(k+': expected string or null')}}
  if(!Array.isArray(profile?.follow_up)||profile.follow_up.some(q=>!keys.includes(q.field)||typeof q.question!=='string'))failures.push('Invalid follow_up structure');
 }
 if(rule==='accuracy')for(const k of keys)if(expected.expected[k].value!==null&&!same(fields[k]?.value,expected.expected[k].value))failures.push(`${k}: expected ${JSON.stringify(expected.expected[k].value)}, got ${JSON.stringify(fields[k]?.value)}`);
 if(rule==='unknowns')for(const k of keys)if(expected.expected[k].value===null&&fields[k]?.value!==null)failures.push(`${k}: not supported by the transcript; must be null`);
 if(rule==='evidence')for(const k of keys){const f=fields[k],e=expected.expected[k];if(f?.value!==null||e.status==='conflicting'){if(typeof f?.evidence!=='string'||!expected.transcript.includes(f.evidence)||f.evidence!==e.evidence)failures.push(`${k}: citation must match the annotated transcript passage`)}else if(f?.evidence!==null)failures.push(`${k}: unknown field must not have invented evidence`)}
 if(rule==='uncertainty')for(const k of keys)if(fields[k]?.status!==expected.expected[k].status)failures.push(`${k}: expected status ${expected.expected[k].status}, got ${fields[k]?.status}`);
 if(rule==='followup'){const required=keys.filter(k=>expected.expected[k].status!=='supported');for(const k of required)if(!profile?.follow_up?.some(q=>q.field===k&&typeof q.question==='string'&&q.question.trim().length>10))failures.push(`${k}: missing targeted follow-up`);for(const q of profile?.follow_up||[])if(!required.includes(q.field))failures.push(`${q.field}: follow-up must target an unresolved field`);}
 if(!['schema','accuracy','unknowns','evidence','uncertainty','followup'].includes(rule))throw Error('Unknown assertion rule: '+rule);
 return {pass:failures.length===0,score:failures.length===0?1:0,reason:failures.length?failures.join('; '):({schema:'Valid eight-field JSON profile',accuracy:'All supported facts retained',unknowns:'No unsupported values filled',evidence:'All required quotes match the transcript',uncertainty:'Missing and conflicting facts labeled correctly',followup:'All unresolved fields receive focused questions'})[rule]};
};
 if(typeof module==='object'&&module.exports)module.exports=grade;else root.BubsProfileGrade=grade;})(globalThis);
