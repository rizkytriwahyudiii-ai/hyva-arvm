'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const navLinks = [
  { name: 'SHOP', path: '/' },
  { name: 'WANITA', path: '/search?category=wanita' },
  { name: 'PRIA', path: '/search?category=pria' },
  { name: 'UNISEX', path: '/search?category=unisex' },
  { name: 'ABOUT', path: '/about' },
];

function NavLinksInner({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <>
      {navLinks.map((item) => {
        const [itemPath, itemQuery] = item.path.split('?');
        const itemCategory = itemQuery
          ? new URLSearchParams(itemQuery).get('category')
          : null;

        const isActive =
          pathname === itemPath &&
          (itemCategory ? currentCategory === itemCategory : !currentCategory);

        return (
          <Link
            key={item.name}
            href={item.path}
            onClick={onClick}
            className={`block group relative ${className ?? ''} ${isActive ? 'font-bold' : ''}`}
          >
            {item.name}
            <span
              className={`absolute -bottom-0.5 left-0 h-px bg-black transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}

export default function NavLinks({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Suspense
      fallback={
        <>
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={onClick}
              className={`block ${className ?? ''}`}
            >
              {item.name}
            </Link>
          ))}
        </>
      }
    >
      <NavLinksInner className={className} onClick={onClick} />
    </Suspense>
  );
}
