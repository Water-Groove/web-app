import AdminDashboardShell from './_components/AdminDashboardShell';
import { requireAdmin } from '@/lib/auth/guards';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();

  return (
    <AdminDashboardShell authUser={user}>
      {children}
    </AdminDashboardShell>
  );
}
