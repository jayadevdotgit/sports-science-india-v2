import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';
import {staffBackend,StaffError} from '@/lib/staff/backend';
import {otp,otpHash,issueSession,STAFF_COOKIE,staffCookieOptions} from '@/lib/staff/session';
export const runtime='nodejs';
export async function POST(request:Request){try{
  if(request.headers.get('origin')!==new URL(request.url).origin)throw new StaffError('Invalid request origin',403);
  const raw=await request.text();if(raw.length>1000)throw new StaffError('Invalid request');
  const p=JSON.parse(raw);const email=typeof p.email==='string'?p.email.trim().toLowerCase():'';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)throw new StaffError('Enter a valid email address');
  if(p.mode==='request'){
    if(!process.env.SMTP_USER||!process.env.SMTP_PASS)throw new StaffError('Email sign-in is not configured yet.',503);
    const code=otp();const hash=otpHash(email,code);
    const result=await staffBackend({operation:'auth_request',email,hash});
    if(result.send){
      const port=Number(process.env.SMTP_PORT)||587;
      const transport=nodemailer.createTransport({host:process.env.SMTP_HOST||'smtp.gmail.com',port,secure:port===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},connectionTimeout:15000,socketTimeout:20000});
      await transport.sendMail({from:{name:'Sports Science India',address:process.env.SMTP_USER},to:email,subject:'Your Sports Science India staff sign-in code',text:`Your sign-in code is ${code}. It expires in 10 minutes. Do not share this code. If you did not request it, ignore this email.`});
    }
    return NextResponse.json({ok:true,message:'If this email is registered, a sign-in code has been sent. Please wait at least one minute before requesting another.'});
  }
  if(p.mode!=='verify'||typeof p.code!=='string'||!/^\d{6}$/.test(p.code))throw new StaffError('Enter the six-digit code');
  await staffBackend({operation:'auth_verify',email,hash:otpHash(email,p.code)});
  const response=NextResponse.json({ok:true});response.cookies.set(STAFF_COOKIE,issueSession(email),staffCookieOptions);return response;
}catch(error){console.error('[staff-auth]',error);return NextResponse.json({error:error instanceof StaffError?error.message:'Unable to sign in. Please try again or contact the office.'},{status:error instanceof StaffError?error.status:503})}}
