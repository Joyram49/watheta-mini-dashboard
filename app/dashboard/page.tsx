import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to products page since there's no dashboard overview
  redirect('/dashboard/products');
}
