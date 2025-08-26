'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

const Breadcrumb = ({
  homeElement = <FiHome className="h-4 w-4" />,
  separator = <FiChevronRight className="h-4 w-4 mx-2 text-gray-500 dark:text-dark-400" />,
  containerClasses = "flex py-4",
  listClasses = "flex items-center text-sm text-gray-600 dark:text-dark-400",
  activeClasses = "text-primary-600 dark:text-primary-400 font-medium",
  capitalizeLinks = true,
}: BreadcrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  return (
    <nav aria-label="breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
            aria-label="Home"
          >
            {homeElement}
          </Link>
          {pathNames.length > 0 && separator}
        </li>
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const formattedLink = capitalizeLinks 
            ? link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ')
            : link.replace(/-/g, ' ');
          
          const isLast = index === pathNames.length - 1;
          
          return (
            <li key={href} className="flex items-center">
              <Link
                href={href}
                className={`transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${isLast ? activeClasses : 'text-gray-600 dark:text-dark-400'}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {formattedLink}
              </Link>
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
