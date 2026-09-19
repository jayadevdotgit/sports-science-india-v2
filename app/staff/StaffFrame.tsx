'use client';

import { usePathname } from 'next/navigation';
import styles from './portal.module.css';

export default function StaffFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The login page shares the public/admin shell. Keep the dashboard-only
  // portal CSS away from Navbar so it cannot override its navigation layout.
  if (pathname.endsWith('/login')) return <>{children}</>;
  return <div className={styles.portalScope}>{children}</div>;
}
