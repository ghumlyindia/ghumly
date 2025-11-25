'use client';
import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 20 }) => {
  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          disabled={readonly}
          className={`
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}
            ${value <= rating ? 'text-amber-400' : 'text-gray-300'}
          `}
        >
          <Star 
            size={size} 
            fill={value <= rating ? 'currentColor' : 'none'}
            className="transition-colors"
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;

