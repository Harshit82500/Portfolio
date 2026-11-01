import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
        <span className="font-mono text-xs uppercase tracking-widest text-ink font-semibold">
          404 / Missing Archive
        </span>
      </div>
      <h1 className="font-sans font-extrabold text-5xl sm:text-7xl text-ink tracking-tight mb-6">
        Nothing to see here.
      </h1>
      <p className="text-ink/70 max-w-md font-sans text-sm sm:text-base mb-8 leading-relaxed">
        The requested resource does not exist or has been relocated within the portfolio directory.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper hover:bg-gold hover:text-ink text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-sm"
      >
        <ArrowLeft size={14} />
        <span>Return to Overview</span>
      </Link>
    </div>
  );
};
