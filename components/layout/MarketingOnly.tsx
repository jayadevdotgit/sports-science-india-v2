'use client';
import {usePathname} from 'next/navigation';
export default function MarketingOnly({children}:{children:React.ReactNode}){const path=usePathname();return path.startsWith('/staff')||path.startsWith('/admin/staff')?null:children}
