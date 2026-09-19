import {currentStaff} from '@/lib/staff/session';
import {staffBackend,StaffError} from '@/lib/staff/backend';
export const runtime='nodejs';
export const dynamic='force-dynamic';
function fail(error:unknown){return Response.json({error:error instanceof StaffError?error.message:'Unable to connect to staff records. Please try again.'},{status:error instanceof StaffError?error.status:503,headers:{'Cache-Control':'no-store'}})}
export async function GET(){try{const user=await currentStaff();if(!user)return Response.json({error:'Sign in to access your staff portal.'},{status:401});const data=await staffBackend({operation:'read',actor:user.email});return Response.json(data,{headers:{'Cache-Control':'no-store'}})}catch(error){return fail(error)}}
export async function POST(request:Request){try{
  if(request.headers.get('origin')!==new URL(request.url).origin)throw new StaffError('Invalid request origin',403);
  const user=await currentStaff();if(!user)throw new StaffError('Sign in to access your staff portal.',401);
  const body=await request.text();if(body.length>8000)throw new StaffError('Request is too large');
  const payload=JSON.parse(body);
  if(!['checkin','checkout','leave','cancel','decision','staff'].includes(payload?.action))throw new StaffError('Unknown action');
  const data=await staffBackend({...payload,operation:payload.action,actor:user.email});return Response.json(data);
}catch(error){return fail(error)}}
