import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {SESSION_COOKIE,verifySessionToken} from '@/lib/auth';
import {currentStaff} from '@/lib/staff/session';
import {staffBackend,STAFF_ADMIN_EMAIL} from '@/lib/staff/backend';
import PrintButton from './PrintButton';
import styles from './report.module.css';
export const dynamic='force-dynamic';
type Person={name:string;email:string;joiningDate?:string;active:boolean};
type Attendance={id:string;email:string;day:string;check_in:string;check_out:string|null};
type Leave={id:string;email:string;type:string;start:string;end:string;days:number;monthDays:number;status:string;reason:string;created?:string;reviewed_by?:string;reviewed_at?:string};
type Report={reportVersion:number;month:string;people:Person[];attendance:Attendance[];leave:Leave[]};
export default async function MonthlyReport({searchParams}:{searchParams:Promise<{month?:string}>}){
 const admin=verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
 const staff=admin?null:await currentStaff();
 if(!admin&&staff?.email!==STAFF_ADMIN_EMAIL)redirect('/admin');
 const month=(await searchParams).month||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit'}).format(new Date());
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))return <main className={styles.report}><h1>Choose a valid month</h1><a href="/admin/staff">Return to staff management</a></main>;
 let report:Report;
 try{report=await staffBackend({operation:'report',actor:STAFF_ADMIN_EMAIL,month}) as unknown as Report;if(report.reportVersion!==1)throw new Error('Deploy the updated staff-portal.gs to enable monthly reports.');}
 catch(error){return <main className={styles.report}><h1>Report unavailable</h1><p>{error instanceof Error?error.message:'Please try again.'}</p><a href={admin?'/admin/staff':'/staff'}>Return to staff management</a></main>}
 const name=(email:string)=>report.people.find(p=>p.email===email)?.name||email;
 const title=new Date(month+'-01T12:00:00+05:30').toLocaleDateString('en-IN',{month:'long',year:'numeric',timeZone:'Asia/Kolkata'});
 const generated=new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour12:true});
 return <main className={styles.report}>
 <div className={styles.controls}><a href={admin?'/admin/staff':'/staff'}>Back to staff management</a><PrintButton/><p>Choose “Save as PDF” in the print dialog. Use A4 landscape; turn off browser headers and footers.</p></div>
 <header><p className={styles.brand}>SPORTS SCIENCE INDIA</p><h1>Monthly staff report</h1><h2>{title}</h2><p>Generated {generated} IST · Confidential — administrator use</p></header>
 <section><h2>Monthly summary</h2><p>{report.attendance.length} attendance records · {report.leave.length} leave requests overlapping this month · {report.leave.filter(l=>l.status==='Approved').reduce((sum,l)=>sum+l.monthDays,0)} approved leave days in this month</p><p>All times are IST. Sundays are excluded from leave days. Current statuses are shown at export time; this is not a historical month-end snapshot. SSI Office is excluded.</p></section>
 <section><h2>Staff directory — current details</h2><table><thead><tr><th>Name</th><th>Email</th><th>Joining date</th><th>Access</th></tr></thead><tbody>{report.people.map(p=><tr key={p.email}><td>{p.name}</td><td>{p.email}</td><td>{p.joiningDate||'Not set'}</td><td>{p.active?'Active':'Inactive'}</td></tr>)}</tbody></table>{!report.people.length&&<p>No employees.</p>}</section>
 <section><h2>Attendance</h2><table><thead><tr><th>Employee / email</th><th>Date</th><th>Check in (IST)</th><th>Check out (IST)</th><th>Record ID</th></tr></thead><tbody>{report.attendance.map(a=><tr key={a.id}><td>{name(a.email)}<small>{a.email}</small></td><td>{a.day}</td><td>{a.check_in||'—'}</td><td>{a.check_out||'Not recorded'}</td><td>{a.id}</td></tr>)}</tbody></table>{!report.attendance.length&&<p>No attendance recorded in this month.</p>}</section>
 <section><h2>Leave requests</h2><p>“Month days” counts only the part of a request within {title}. All statuses are included.</p><table><thead><tr><th>Employee / type</th><th>Dates</th><th>Month / total days</th><th>Status</th><th>Reason</th><th>Audit details</th></tr></thead><tbody>{report.leave.map(l=><tr key={l.id}><td>{name(l.email)}<small>{l.email}</small><small>{l.type}</small></td><td>{l.start}<br/>to {l.end}</td><td>{l.monthDays} / {l.days}</td><td>{l.status}</td><td className={styles.reason}>{l.reason}</td><td><small>ID: {l.id}</small><small>Created: {l.created||'—'}</small><small>Reviewer: {l.reviewed_by||'—'}</small><small>Reviewed: {l.reviewed_at||'—'}</small></td></tr>)}</tbody></table>{!report.leave.length&&<p>No leave requests overlapping this month.</p>}</section>
 </main>
}
