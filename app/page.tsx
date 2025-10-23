import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-background min-h-screen'>
      <div className='mx-auto max-w-4xl px-6 py-16'>
        {/* Hero Section */}
        <div className='mb-16 text-center'>
          <h1 className='text-foreground mb-4 text-4xl font-bold tracking-tight'>
            Welcome to Watheta
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed'>
            Your comprehensive dashboard for managing products and orders with
            ease and efficiency.
          </p>
        </div>

        {/* Main Content Card */}
        <div className='bg-card border-border rounded-xl border p-8 shadow-sm'>
          <div className='mb-8 text-center'>
            <h2 className='text-card-foreground mb-3 text-2xl font-semibold'>
              Dashboard Overview
            </h2>
            <p className='text-muted-foreground mx-auto max-w-xl'>
              Access all your business information in one place. Manage your
              inventory, track orders, and monitor your business performance.
            </p>
          </div>

          {/* Action Section */}
          <div className='flex justify-center'>
            <Link
              href='/dashboard/products'
              className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring inline-flex items-center rounded-lg px-6 py-3 font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none'
            >
              View Products Dashboard
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-12 text-center'>
          <p className='text-muted-foreground text-sm'>
            Navigate to the dashboard to explore all available features
          </p>
        </div>
      </div>
    </div>
  );
}
