'use client';

import { useTheme } from '../providers';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative inline-flex items-center">
      <SunIcon className="w-5 h-5 text-yellow-500 dark:text-gray-400 mr-2" />

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDark}
          onChange={toggleTheme}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>

      <MoonIcon className="w-5 h-5 text-gray-500 dark:text-blue-400 ml-2" />
    </div>
  );
} 