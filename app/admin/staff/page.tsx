import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {SESSION_COOKIE,verifySessionToken} from '@/lib/auth';
import Portal from '@/app/staff/portal';
import StaffFrame from '@/app/staff/StaffFrame';
export const dynamic='force-dynamic';
export default async function StaffManagement(){
 if(!verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value))redirect('/admin');
 return <StaffFrame><Portal adminMode/></StaffFrame>;
}
