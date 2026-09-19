import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {countLeaveDays} from '../lib/staff/leave-days.ts';
const source=readFileSync(new URL('../google-apps-script/staff-portal.gs',import.meta.url),'utf8');
const admin='sportsscienceindia.office@gmail.com';
function fixture(){
  const tables=new Map();let uid=0;
  class FixedDate extends Date{constructor(...args){super(...(args.length?args:['2026-09-19T06:00:00Z']))}}
  const context=vm.createContext({Date:FixedDate,Utilities:{formatDate:()=> '2026-09-19',getUuid:()=>String(++uid)}});
  vm.runInContext(source,context);
  const people=new Map([[admin,{email:admin,name:'Office',active:true,joiningDate:'2025-01-01'}]]);
  context.staffDirectory_=()=>structuredClone([...people.values()]);
  context.staffSavePerson_=person=>{if(person.originalEmail)people.delete(person.originalEmail);people.set(person.email,structuredClone(person))};
  context.staffRows_=name=>structuredClone([...((tables.get(name)||new Map()).values())]);
  context.staffPut_=(name,id,record)=>{if(!tables.has(name))tables.set(name,new Map());tables.get(name).set(id,structuredClone(record))};
  const call=p=>context.staffDispatch_(p);
  const result=call({operation:'staff',actor:admin,email:'staff@example.test',name:'Test staff',joiningDate:'2026-01-01'});assert.equal(result.ok,true);
  return {call,context};
}
test('Sunday-free leave reservation, approval, rejection and history',()=>{
  const {call}=fixture();const actor='staff@example.test';
  assert.equal(call({operation:'leave',actor,start:'2026-09-19',end:'2026-09-21',type:'Casual Leave (CL)',reason:'Test'}).ok,true);
  let state=call({operation:'read',actor});assert.equal(state.leave[0].days,2);
  const id=state.leave[0].id;
  assert.equal(call({operation:'decision',actor,id,status:'Approved'}).status,403);
  assert.equal(call({operation:'decision',actor:admin,id,status:'Approved'}).ok,true);
  state=call({operation:'read',actor});assert.equal(state.leave[0].reviewed_by,admin);
  assert.equal(call({operation:'decision',actor:admin,id,status:'Rejected'}).ok,false);
  assert.equal(call({operation:'leave',actor,start:'2026-09-21',end:'2026-09-22',type:'Casual Leave (CL)',reason:'Overlap'}).ok,false);
  assert.equal(call({operation:'leave',actor,start:'2026-09-27',end:'2026-09-27',type:'Casual Leave (CL)',reason:'Sunday'}).ok,false);
});
test('isolation, quota bounds and cancellation release',()=>{
  const {call}=fixture();const actor='staff@example.test';
  call({operation:'leave',actor,start:'2026-09-21',end:'2026-10-03',type:'Casual Leave (CL)',reason:'Uses 12 days'});
  assert.equal(call({operation:'leave',actor,start:'2026-10-05',end:'2026-10-05',type:'Casual Leave (CL)',reason:'Exceeds balance'}).ok,false);
  assert.equal(call({operation:'leave',actor,start:'2026-10-06',end:'2026-10-06',type:'Sick Leave (SL)',reason:'Separate balance'}).ok,true);
  const id=call({operation:'read',actor}).leave[0].id;
  assert.equal(call({operation:'cancel',actor:admin,id}).status,403);
  assert.equal(call({operation:'cancel',actor,id}).ok,true);
  assert.equal(call({operation:'leave',actor,start:'2026-10-05',end:'2026-10-05',type:'Sick Leave (SL)',reason:'Available again'}).ok,true);
  assert.equal(call({operation:'staff',actor,email:'intruder@example.test',name:'Intruder',quota:20}).status,403);
  const state=call({operation:'read',actor});assert.equal(state.people.length,1);
  assert.equal(call({operation:'read',actor:'unknown@example.test'}).status,403);
});
test('attendance prevents duplicates and records checkout once',()=>{
  const {call}=fixture();const actor='staff@example.test';
  assert.equal(call({operation:'checkout',actor}).ok,false);
  assert.equal(call({operation:'checkin',actor}).ok,true);
  assert.equal(call({operation:'checkin',actor}).ok,false);
  assert.equal(call({operation:'checkout',actor}).ok,true);
  assert.equal(call({operation:'checkout',actor}).ok,false);
});
test('email codes are limited, single-use and only sent to registered staff',()=>{
  const {call}=fixture();const email='staff@example.test';
  assert.equal(call({operation:'auth_request',email:'unknown@example.test',hash:'hash'}).send,false);
  assert.equal(call({operation:'auth_request',email,hash:'hash'}).send,true);
  assert.equal(call({operation:'auth_request',email,hash:'hash2'}).send,false);
  assert.equal(call({operation:'auth_verify',email,hash:'wrong'}).status,401);
  assert.equal(call({operation:'auth_verify',email,hash:'hash'}).verified,true);
  assert.equal(call({operation:'auth_verify',email,hash:'hash'}).status,401);
});
test('five failed codes exhaust the challenge',()=>{
  const {call}=fixture();const email='staff@example.test';
  call({operation:'auth_request',email,hash:'hash'});
  for(let i=0;i<5;i++)assert.equal(call({operation:'auth_verify',email,hash:'wrong'}).status,401);
  assert.equal(call({operation:'auth_verify',email,hash:'hash'}).status,401);
});
test('browser and backend agree for every start weekday and range length',()=>{
  const {context}=fixture();
  for(let day=19;day<=25;day++)for(let length=0;length<40;length++){
    const start=`2026-09-${day}`;const end=new Date(Date.parse(start)+length*86400000).toISOString().slice(0,10);
    assert.equal(context.staffDays_(start,end),countLeaveDays(start,end));
  }
});

test('full annual allowance unlocks at 90 days and resets at year end',()=>{
 const {context}=fixture();const person={email:'p',active:true,joiningDate:'2026-01-01'};
 let p=context.staffLeavePolicy_(person,[],'2026-03-31');assert.equal(p.eligible,false);assert.equal(p.balances[0].available,0);
 p=context.staffLeavePolicy_(person,[],'2026-04-01');assert.equal(p.eligible,true);assert.equal(p.balances[0].earned,12);assert.equal(p.balances[1].available,12);
 const late={...person,joiningDate:'2026-09-01'};
 assert.equal(context.staffLeavePolicy_(late,[],'2026-11-29').eligible,false);
 assert.equal(context.staffLeavePolicy_(late,[],'2026-11-30').balances[0].available,12);
 const rows=[{email:'p',type:'Sick Leave (SL)',start:'2026-12-01',days:3,status:'Approved'},{email:'p',type:'Sick Leave (SL)',start:'2026-12-10',days:2,status:'Pending'}];
 p=context.staffLeavePolicy_(late,rows,'2026-12-31');assert.equal(p.balances[0].available,7);assert.equal(p.balances[1].available,12);
 assert.equal(context.staffLeavePolicy_(late,rows,'2027-01-01').balances[0].available,12);
 assert.equal(context.staffLeavePolicy_({...person,joiningDate:''},[],'2026-12-31').balances[0].available,0);
 assert.equal(context.staffLeavePolicy_({...person,joiningDate:'2027-01-01'},[],'2026-12-31').eligible,false);
 assert.throws(()=>context.staffValidateLeave_(person,[],'2026-03-31','Sick Leave (SL)','2026-04-01',1));
 assert.doesNotThrow(()=>context.staffValidateLeave_(late,[],'2026-11-30','Sick Leave (SL)','2026-12-01',12));
 assert.throws(()=>context.staffValidateLeave_(late,[],'2026-11-30','Sick Leave (SL)','2026-12-01',13));
});

test('unpaid leave bypasses paid quota but not eligibility; marriage is lifetime limited',()=>{
  const {context}=fixture();
  const person={email:'p',active:true,joiningDate:'2025-01-01'};
  const rows=[{email:'p',type:'Marriage Leave',start:'2025-06-01',days:10,status:'Approved'}];
  assert.throws(()=>context.staffValidateLeave_(person,rows,'2026-09-19','Marriage Leave','2026-09-21',1));
  assert.doesNotThrow(()=>context.staffValidateLeave_(person,rows,'2026-09-19','Unpaid Leave (LWP/LOP)','2026-09-21',50));
  assert.throws(()=>context.staffValidateLeave_({...person,joiningDate:'2026-09-01'},[],'2026-09-19','Unpaid Leave (LWP/LOP)','2026-09-21',1));
});

test('admin employee edits, removal, restoration and protected office account',()=>{
 const {call}=fixture();const email='staff@example.test';
 const checked=call({operation:'checkin',actor:email});assert.equal(checked.attendanceRecord.email,email);
 assert.equal(call({operation:'staff',actor:email,email,name:'Unauthorised',active:false}).status,403);
 assert.equal(call({operation:'staff',actor:admin,email:admin,name:'Office',active:false}).status,403);
 assert.equal(call({operation:'staff',actor:admin,email,name:'Updated name',joiningDate:'2026-06-01',active:false}).ok,true);
 assert.equal(call({operation:'read',actor:email}).status,403);
 assert.equal(call({operation:'auth_request',email,hash:'test'}).send,false);
 let state=call({operation:'read',actor:admin});assert.equal(state.attendance.length,1);
 assert.equal(state.people.find(p=>p.email===email).joiningDate,'2026-06-01');
 assert.equal(call({operation:'staff',actor:admin,email,name:'Updated name',active:true}).ok,true);
 assert.equal(call({operation:'read',actor:email}).attendance.length,1);
 assert.equal(call({operation:'staff',actor:admin,email,name:'Updated name',joiningDate:'2026-02-30'}).ok,false);
});
test('email corrections preserve records and invalidate old login',()=>{
 const {call}=fixture();const actor='staff@example.test',email='corrected@example.test';
 call({operation:'checkin',actor});
 call({operation:'leave',actor,start:'2026-09-21',end:'2026-09-21',type:'Casual Leave (CL)',reason:'Test'});
 assert.equal(call({operation:'staff',actor:admin,originalEmail:actor,email,name:'Corrected'}).ok,true);
 assert.equal(call({operation:'read',actor}).status,403);
 const state=call({operation:'read',actor:email});assert.equal(state.attendance[0].email,email);assert.equal(state.leave[0].email,email);
 assert.equal(state.me.joiningDate,'2026-01-01');
 assert.equal(call({operation:'staff',actor:admin,originalEmail:email,email:admin,name:'Bad'}).status,403);
});

test('request-local sheet reuse avoids repeat reads and preserves physical rows',()=>{
 let opens=0,reads=0;
 const rows=[['Email','Hash','Expires (ms)','Attempts','Sent At (ms)','Sent At (IST)','Window Start (ms)','Window Start (IST)','Sent'],['','','','','','','','',''],['a@test.com','old','123','0','1','','1','','1']];
 const sheet={getLastRow:()=>rows.length,getLastColumn:()=>9,getRange:(r,c,h=1,w=1)=>{
  const range={getDisplayValues:()=>{reads++;return Array.from({length:h},(_,i)=>Array.from({length:w},(_,j)=>String(rows[r-1+i]?.[c-1+j]??'')))},setNumberFormat:()=>range,setValues:values=>{values.forEach((row,i)=>{rows[r-1+i]??=[];row.forEach((v,j)=>rows[r-1+i][c-1+j]=v)});return range}};return range;
 }};
 const context=vm.createContext({SHEET_ID:'test',SpreadsheetApp:{openById:()=>{opens++;return {getSheetByName:()=>sheet}}},Utilities:{formatDate:()=> 'time'}});
 vm.runInContext(source,context);
 assert.equal(context.staffRows_('Auth')[0].hash,'old');
 context.staffPut_('Auth','a@test.com',{email:'a@test.com',hash:'new',expires:123,attempts:1,sentAt:1,windowStart:1,sent:1});
 assert.equal(opens,1);assert.equal(reads,1,'write reuses the existing read');
 assert.equal(rows[1][0],'');assert.equal(rows[2][1],'new');
 assert.equal(context.staffRows_('Auth')[0].hash,'new','write invalidates cached rows');
 // A new request must re-read account/OTP state, never reuse an old authorization snapshot.
 vm.runInContext('staffRequest_ = null',context);
 rows[2][1]='external-update';assert.equal(context.staffRows_('Auth')[0].hash,'external-update');assert.equal(opens,2);
});
