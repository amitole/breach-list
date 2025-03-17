'use client';

import { Breach } from '../services/breachService';
import { formatDate } from '../utils/dateUtils';
import { ShieldExclamationIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface BreachDetailsProps {
  breach: Breach;
}

export default function BreachDetails({ breach }: BreachDetailsProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      {/* Description Section */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
          <ShieldExclamationIcon className="w-4 h-4 mr-2" />
          Description
        </h4>
        <p className="text-sm dark:text-white leading-relaxed">
          {breach.Description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Modified Date
          </h4>
          <p className="text-sm text-gray-700 dark:text-white">
            {formatDate(breach.ModifiedDate)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800/30">
          <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1 flex items-center">
            <UserGroupIcon className="w-4 h-4 mr-2" />
            Number of Accounts
          </h4>
          <p className="text-sm text-gray-700 dark:text-white">
            {breach.PwnCount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center">
          <ShieldExclamationIcon className="w-4 h-4 mr-2" />
          Data Classes
        </h4>
        <div className="flex flex-wrap gap-2">
          {breach.DataClasses.map((dataClass, index) => (
            <span 
              key={index}
              className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-indigo-200 dark:border-indigo-800/30 hover:shadow-md transition-shadow duration-200"
            >
              {dataClass}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 