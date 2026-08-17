import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`breadcrumb-nav bg-white/90 dark:bg-slate-900/90 border border-amber-200 dark:border-amber-900/40 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm dark:shadow-md backdrop-blur-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;
          const Icon = item.icon || (index === 0 ? Home : undefined);

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight 
                  className="w-3.5 h-3.5 text-amber-500/70 dark:text-amber-500/60 flex-shrink-0" 
                  aria-hidden="true" 
                />
              )}

              {isLast ? (
                <span 
                  className="font-bold text-amber-700 dark:text-amber-300 max-w-[180px] sm:max-w-xs md:max-w-md truncate flex items-center gap-1.5"
                  aria-current="page"
                  title={item.label}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer group"
                >
                  {Icon && (
                    <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                  )}
                  <span>{item.label}</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                  {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
