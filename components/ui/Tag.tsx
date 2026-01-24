import React from 'react';

interface TagProps {
  /** Text to display in the tag */
  label: string;
}

/**
 * A simple keyword tag component.
 * Used in the Property Details page to display tags.
 */
export default function Tag({ label }: TagProps) {
  return (
    <div className="bg-gray-100 text-gray-700 text-[10px] md:text-xs px-1 py-1.5 md:py-2 rounded-[5px] font-medium w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
      {label}
    </div>
  );
}
