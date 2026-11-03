const fixture=require('./fixtures.json');
module.exports=class RecordedOutputProvider{
 constructor(options){this.strategy=options.config.strategy;}
 id(){return `bubs-recorded:${this.strategy}`;}
 async callApi(prompt,context){const output=fixture.outputs[context.vars.caseId]?.[this.strategy];if(!output)throw Error('Fixture output missing');return{output:JSON.stringify(output),metadata:{mode:'hand-authored fixture replay',strategy:this.strategy}};}
};
