'use client';

import { Breach } from '../services/breachService';
import Image from 'next/image';
import BreachDetails from './BreachDetails';
import { formatDate } from '../utils/dateUtils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface BreachCardProps {
  breach: Breach;
  isExpanded: boolean;
  onExpand: (breachId: string) => void;
}

export default function BreachCard({ breach, isExpanded, onExpand }: BreachCardProps) {
  return (
    <div 
      className="breach-card rounded-lg p-4 mb-4 hover:cursor-pointer transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
      onClick={() => onExpand(breach.Name)}
    >
      <div className="flex items-center">
        <div className="w-16 h-16 relative mr-4 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-700">
          {breach.LogoPath ? (
            <Image 
              src={breach.LogoPath} 
              alt={`${breach.Title} logo`} 
              width={64} 
              height={64}
              className="object-contain"
            />
          ) : (
            <div className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-600 bg-clip-text text-transparent">
              {breach.Title.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{breach.Title}</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Breach date: {formatDate(breach.BreachDate)}
          </p>
          <p className="text-sm dark:text-gray-300 line-clamp-2 mt-1">
            {breach.Domain}
          </p>
        </div>
        <ChevronDownIcon 
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
        />
      </div>

      <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <BreachDetails breach={breach} />
      </div>
    </div>
  );
} 