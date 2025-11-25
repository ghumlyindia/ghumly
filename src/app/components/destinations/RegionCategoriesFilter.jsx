'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RegionCategoriesFilter = ({ categories = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('category') || '';

  const onChange = (value) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    value ? params.set('category', value) : params.delete('category');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center py-6">
      <button
        onClick={() => onChange('')}
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${current === ''
            ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
      >
        All Categories
      </button>
      {categories.map(c => (
        <button
          key={c._id}
          onClick={() => onChange(c._id)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${current === c._id
              ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
        >
          {c.categoryName}
        </button>
      ))}
    </div>
  );
};

export default RegionCategoriesFilter;


