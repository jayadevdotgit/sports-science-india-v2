import {createHmac,randomInt,timingSafeEqual} from 'node:crypto';
import {cookies} from 'next/headers';
export const STAFF_COOKIE='ssi_staff_session';
const LIFETIME=8*60*60;
function secret(){const value=process.env.STAFF_SESSION_SECRET||process.env.ADMIN_SECRET;if(!value||value.length<32)throw new Error('A session secret of at least 32 characters is required');return value;}
function signature(value:string){return createHmac('sha256',secret()).update('staff:'+value).digest('base64url')}
export function issueSession(email:string){const payload=Buffer.from(JSON.stringify({email,exp:Math.floor(Date.now()/1000)+LIFETIME})).toString('base64url');return payload+'.'+signature(payload)}
export function readSession(value:string|undefined):{email:string}|null {
  if(!value)return null;
  try{const parts=value.split('.');if(parts.length!==2)return null;
    const expected=Buffer.from(signature(parts[0]));const supplied=Buffer.from(parts[1]);
    if(expected.length!==supplied.length||!timingSafeEqual(expected,supplied))return null;
    const data=JSON.parse(Buffer.from(parts[0],'base64url').toString());
    if(typeof data.email!=='string'||!Number.isFinite(data.exp)||data.exp<=Date.now()/1000)return null;
    return {email:data.email};
  }catch{return null}
}
export async function currentStaff(){return readSession((await cookies()).get(STAFF_COOKIE)?.value)}
export function otp(){return String(randomInt(100000,1000000))}
export function otpHash(email:string,code:string){return signature('otp:'+email+':'+code)}
export const staffCookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/',maxAge:LIFETIME};
