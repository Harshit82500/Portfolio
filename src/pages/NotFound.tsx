import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="font-mono text-xs uppercase tracking-widest text-[#FF4B2B] mb-4">
        404 / Page Not Found
      </span>
      <h1 className="font-serif text-5xl sm:text-7xl text-[#ECE7DD] mb-6">
        Nothing to see here.
      </h1>
      <p className="text-[#8A857B] max-w-md font-sans text-sm sm:text-base mb-8">
        The requested resource does not exist or has been relocated within the directory.
      </p>
      <Link to="/">
        <Button variant="outline" size="md" icon={<ArrowLeft size={14} className="rotate-0" />}>
          Return to Overview
        </Button>
      </Link>
    </div>
  );
};
