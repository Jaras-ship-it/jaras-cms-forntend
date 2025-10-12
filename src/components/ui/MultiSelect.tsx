"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "اختر العناصر...",
  className,
  disabled = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected option labels
  const selectedLabels = value
    .map((val) => options.find((option) => option.value === val)?.label)
    .filter(Boolean);

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((val) => val !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemoveSelected = (optionValue: string) => {
    onChange(value.filter((val) => val !== optionValue));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const inputClasses = cn(
    "py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none border border-slate-200",
    className
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Input */}
      <div
        className={cn(
          inputClasses,
          "cursor-pointer min-h-[45px] flex items-center justify-between",
          disabled && "bg-gray-50"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selectedLabels.map((label, index) => (
                <span
                  key={value[index]}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelected(value[index]);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {value.length > 0 && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="text-gray-400 hover:text-gray-600 mr-2"
          >
            ×
          </button>
        )}

        {/* Dropdown Arrow */}
        <svg
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                لا توجد نتائج
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleOption(option.value)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ml-2"
                    />
                    <span className="text-sm text-gray-700 flex-1">
                      {option.label}
                    </span>
                  </label>
                );
              })
            )}
          </div>

          {/* Footer with selection count */}
          {value.length > 0 && (
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
              تم اختيار {value.length} من {options.length}
            </div>
          )}
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="hidden"
          value={value.length > 0 ? "valid" : ""}
          required={required}
        />
      )}
    </div>
  );
};

export default MultiSelect;
