import type {Metadata} from 'next';
import StaffFrame from './StaffFrame';
export const metadata:Metadata={title:'Staff portal',robots:{index:false,follow:false},alternates:{canonical:'/staff'}};
export default function StaffLayout({children}:{children:React.ReactNode}){return <StaffFrame>{children}</StaffFrame>}
