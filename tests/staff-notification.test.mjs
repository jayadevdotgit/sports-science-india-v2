import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {leaveNotificationMessage} from '../lib/staff/leave-notification.ts';

function fixture({reject=false,signedIn=true,mailFails=false}={}){
 const tasks=[],messages=[];let saved=false;
 class StaffError extends Error{constructor(message,status=400){super(message);this.status=status}}
 const modules={
  '@/lib/staff/session':{currentStaff:async()=>signedIn?{email:'employee@example.test'}:null},
  '@/lib/staff/backend':{StaffError,STAFF_ADMIN_EMAIL:'office@example.test',staffBackend:async()=>{if(reject)throw new StaffError('Not eligible');saved=true;return {ok:true}}},
  'next/server':{after:fn=>tasks.push(fn)},
  '@/lib/staff/leave-days':{countLeaveDays:()=>2},
  '@/lib/staff/leave-notification':{sendLeaveNotification:async(data,to)=>{assert.equal(saved,true);messages.push({data,to});if(mailFails)throw new Error('SMTP unavailable')}},
 };
 const exports={};
 const source=readFileSync(new URL('../app/api/staff/route.ts',import.meta.url),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(compiled,{exports,require:name=>{assert.ok(modules[name],name);return modules[name]},Response,URL,console:{error:()=>{}}});
 const post=(action='leave')=>exports.POST(new Request('https://example.test/api/staff',{method:'POST',headers:{origin:'https://example.test'},body:JSON.stringify({action,type:'Sick Leave (SL)',start:'2026-10-12',end:'2026-10-13',reason:'Rest',email:'spoof@example.test',to:'spoof@example.test'})}));
 return {post,tasks,messages};
}
test('saved leave queues one notification to fixed administrator with authenticated identity',async()=>{
 const f=fixture();const response=await f.post();assert.equal(response.status,200);
 assert.equal(f.tasks.length,1);assert.equal(f.messages.length,0,'email must not delay the response');
 await f.tasks[0]();assert.equal(f.messages.length,1);assert.equal(f.messages[0].data.email,'employee@example.test');assert.equal(f.messages[0].to,'office@example.test');
});
test('failed, unauthenticated and non-leave requests do not notify',async()=>{
 for(const options of [{reject:true},{signedIn:false}]){const f=fixture(options);assert.notEqual((await f.post()).status,200);assert.equal(f.tasks.length,0)}
 const f=fixture();await f.post('checkin');assert.equal(f.tasks.length,0);
});
test('email failure does not turn a saved leave request into a failed submission',async()=>{
 const f=fixture({mailFails:true});assert.equal((await f.post()).status,200);await assert.doesNotReject(f.tasks[0]());
});
test('notification contains dates, days and protected review link without HTML interpretation',()=>{
 const message=leaveNotificationMessage({email:'employee@example.test',type:'Sick Leave (SL)',start:'2026-10-12',end:'2026-10-13',days:2,reason:'<b>Rest</b>'});
 assert.match(message.text,/Leave days: 2/);assert.match(message.text,/2026-10-12/);assert.match(message.text,/https:\/\/www.sportsscienceindia.org\/admin\/staff/);assert.equal(message.html,undefined);
});
