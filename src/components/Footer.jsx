import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Insights', to: '/insights' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="border-t border-[#F2F2F2] bg-white/80 backdrop-blur-md mt-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xl tracking-tight">WvOMB<span className="text-[#8A8A8A]">.</span></div>
          <p className="mt-3 text-sm text-[#8A8A8A] max-w-md">
            Strategic digital solutions for brands that want to move with clarity, consistency, and confidence.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav className="flex flex-wrap gap-4 md:justify-end text-sm">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#8A8A8A] hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-[#B3B3B3]">
            © {year} WvOMB Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
