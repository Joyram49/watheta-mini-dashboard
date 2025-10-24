interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <div className='bg-background min-h-screen overflow-x-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
    </div>
  );
}
