/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface Filter {
    name: string;
    css: string;
}

const FILTERS: Filter[] = [
    { name: 'None', css: 'none' },
    { name: 'Sepia', css: 'sepia(0.7)' },
    { name: 'B&W', css: 'grayscale(1)' },
    { name: 'Vintage', css: 'sepia(0.5) contrast(1.1) brightness(0.9) saturate(1.2)' },
];

interface FilterSelectorProps {
    originalImageUrl: string;
    onFilterSelect: (filterCss: string) => void;
    activeFilter: string;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({ originalImageUrl, onFilterSelect, activeFilter }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-lg p-4 bg-black/20 rounded-lg backdrop-blur-sm"
        >
            <h3 className="text-center font-permanent-marker text-lg text-neutral-200 mb-4">Apply a Filter</h3>
            <div className="flex justify-center items-center gap-3 sm:gap-4">
                {FILTERS.map((filter) => (
                    <button
                        key={filter.name}
                        onClick={() => onFilterSelect(filter.css)}
                        className={cn(
                            "flex flex-col items-center gap-2 cursor-pointer group transform transition-all duration-200 hover:scale-105",
                            activeFilter === filter.css ? "text-yellow-400" : "text-neutral-400 hover:text-neutral-100"
                        )}
                        aria-pressed={activeFilter === filter.css}
                    >
                        <div className={cn(
                            "w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-colors duration-200",
                            activeFilter === filter.css ? "border-yellow-400" : "border-neutral-600 group-hover:border-neutral-400"
                        )}>
                            <img
                                src={originalImageUrl}
                                alt={`Preview for ${filter.name} filter`}
                                className="w-full h-full object-cover"
                                style={{ filter: filter.css }}
                            />
                        </div>
                        <span className="font-permanent-marker text-sm sm:text-base tracking-wide">{filter.name}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default FilterSelector;
