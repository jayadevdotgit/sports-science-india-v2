import {NextResponse} from 'next/server';
import {STAFF_COOKIE,staffCookieOptions} from '@/lib/staff/session';
export async function POST(request:Request){if(request.headers.get('origin')!==new URL(request.url).origin)return NextResponse.json({error:'Invalid origin'},{status:403});const response=NextResponse.json({ok:true});response.cookies.set(STAFF_COOKIE,'',{...staffCookieOptions,maxAge:0});return response}
