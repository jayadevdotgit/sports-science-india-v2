export const STAFF_ADMIN_EMAIL = 'sportsscienceindia.office@gmail.com';
export class StaffError extends Error {
  constructor(message:string, public status=400){super(message)}
}
export async function staffBackend(payload:Record<string,unknown>):Promise<Record<string,unknown>> {
  const url=process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const token=process.env.GOOGLE_SHEETS_TOKEN;
  // Old booking scripts treat unknown actions as bookings. Explicit opt-in is required
  // only AFTER installing the staff dispatcher in Apps Script.
  if(process.env.STAFF_PORTAL_ENABLED!=='true'||!url||!token){
    throw new StaffError('Staff portal setup is pending. Please contact the office administrator.',503);
  }
  const response=await fetch(url,{method:'POST',cache:'no-store',redirect:'follow',
    headers:{'Content-Type':'text/plain;charset=utf-8'},signal:AbortSignal.timeout(45000),
    body:JSON.stringify({...payload,action:'staff_portal',key:token})});
  if(!response.ok)throw new StaffError('Staff records are unavailable. Please try again.',503);
  const data=await response.json();
  if(data?.staffVersion!==1)throw new StaffError('The staff backend needs to be updated.',503);
  if(!data.ok)throw new StaffError(data.error||'Unable to complete this action.',data.status||400);
  return data;
}
