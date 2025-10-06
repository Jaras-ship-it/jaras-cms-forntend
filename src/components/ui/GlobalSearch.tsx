"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Search, X, Clock, TrendingUp } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  type: "category" | "product" | "company";
  description?: string;
  url: string;
}

interface GlobalSearchProps {
  placeholder?: string;
}

// Separate SearchOverlay component to prevent re-renders
const SearchOverlay = React.memo(
  ({
    searchRef,
    inputRef,
    query,
    handleInputChange,
    closeSearch,
    isLoading,
    results,
    recentSearches,
    trendingSearches,
    handleSearchSelect,
    handleTrendingSearch,
    getTypeIcon,
    getTypeLabel,
  }: {
    searchRef: React.RefObject<HTMLDivElement | null>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    query: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    closeSearch: () => void;
    isLoading: boolean;
    results: SearchResult[];
    recentSearches: string[];
    trendingSearches: string[];
    handleSearchSelect: (result: SearchResult) => void;
    handleTrendingSearch: (search: string) => void;
    getTypeIcon: (type: SearchResult["type"]) => string;
    getTypeLabel: (type: SearchResult["type"]) => string;
  }) => (
    <div className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-sm">
      <div className="flex items-start justify-center min-h-screen pt-[10vh] px-4">
        <div
          ref={searchRef}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-100">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="ابحث عن شركات، منتجات، فئات..."
              className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={closeSearch}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : query ? (
              // Search Results
              <div className="p-4">
                {results.length > 0 ? (
                  <>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      النتائج ({results.length})
                    </h3>
                    <div className="space-y-1">
                      {results.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearchSelect(result)}
                          className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-right"
                        >
                          <span className="text-xl">
                            {getTypeIcon(result.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900 truncate">
                                {result.title}
                              </h4>
                              <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-full">
                                {getTypeLabel(result.type)}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {result.description}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-gray-500">لا توجد نتائج لهذا البحث</p>
                  </div>
                )}
              </div>
            ) : (
              // Default Content (Recent & Trending)
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      عمليات البحث الأخيرة
                    </h3>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleTrendingSearch(search)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-right"
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-3">
                    <TrendingUp className="w-4 h-4" />
                    البحث الأكثر شيوعاً
                  </h3>
                  <div className="space-y-1">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleTrendingSearch(search)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-right"
                      >
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <kbd className="px-2 py-1 bg-white rounded border">↵</kbd>
                <span>للاختيار</span>
              </div>
              <div className="flex items-center gap-4">
                <kbd className="px-2 py-1 bg-white rounded border">Esc</kbd>
                <span>للإغلاق</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

SearchOverlay.displayName = "SearchOverlay";

const GlobalSearch = ({ placeholder = "البحث..." }: GlobalSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration - memoized to prevent unnecessary re-renders
  const mockResults = useMemo<SearchResult[]>(
    () => [
      {
        id: "1",
        title: "أثاث ومفروشات",
        type: "category",
        description: "كل ما يخص الأثاث والمفروشات للفنادق",
        url: "/categories/furniture",
      },
      {
        id: "2",
        title: "أنظمة وإتصالات",
        type: "category",
        description: "أنظمة الاتصالات والتكنولوجيا",
        url: "/categories/systems",
      },
      {
        id: "3",
        title: "شركة الجودة للأثاث",
        type: "company",
        description: "متخصصون في توريد أثاث الفنادق",
        url: "/companies/quality-furniture",
      },
    ],
    []
  );

  const trendingSearches = useMemo(
    () => [
      "أنظمة إدارة الفنادق",
      "أثاث غرف النوم",
      "معدات المطابخ",
      "أنظمة الأمان",
    ],
    []
  );

  // Set client state to handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define openSearch function
  const openSearch = useCallback(() => {
    setIsOpen(true);
    // Load recent searches from localStorage
    if (isClient && typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, [isClient]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Handle Cmd+K / Ctrl+K shortcut to open search
  useEffect(() => {
    const handleKeyboardShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);
    return () =>
      document.removeEventListener("keydown", handleKeyboardShortcut);
  }, [openSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Memoized search function
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 150));

        const filteredResults = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [mockResults]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      const timeoutId = setTimeout(() => {
        performSearch(searchQuery);
      }, 300); // 300ms delay

      return () => clearTimeout(timeoutId);
    },
    [performSearch]
  );

  // Debounce effect for search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const cleanup = debouncedSearch(query);
    return cleanup;
  }, [query, debouncedSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      // performSearch is now handled by the debounced effect
    },
    []
  );

  const handleSearchSelect = useCallback(
    (result: SearchResult) => {
      // Add to recent searches
      const newRecentSearches = [
        result.title,
        ...recentSearches.filter((s) => s !== result.title),
      ].slice(0, 5);
      setRecentSearches(newRecentSearches);
      if (isClient && typeof window !== "undefined") {
        localStorage.setItem(
          "recentSearches",
          JSON.stringify(newRecentSearches)
        );
      }

      // Navigate to result (you can implement navigation here)
      console.log("Navigate to:", result.url);
      setIsOpen(false);
      setQuery("");
    },
    [recentSearches, isClient]
  );

  const handleTrendingSearch = useCallback((search: string) => {
    setQuery(search);
    // The search will be triggered by the debounced effect
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  }, []);

  const getTypeIcon = useCallback((type: SearchResult["type"]) => {
    switch (type) {
      case "category":
        return "📂";
      case "product":
        return "📦";
      case "company":
        return "🏢";
      default:
        return "🔍";
    }
  }, []);

  const getTypeLabel = useCallback((type: SearchResult["type"]) => {
    switch (type) {
      case "category":
        return "فئة";
      case "product":
        return "منتج";
      case "company":
        return "شركة";
      default:
        return "";
    }
  }, []);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={openSearch}
        className="flex  items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-all duration-200 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full "
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:block text-sm w-full text-right">
          {placeholder}
        </span>
        <kbd className="hidden md:block px-2 py-0.5 text-xs bg-gray-200 rounded text-gray-500">
          ⌘K
        </kbd>
      </button>

      {/* Search Overlay - Rendered via Portal */}
      {isOpen &&
        isClient &&
        typeof document !== "undefined" &&
        createPortal(
          <SearchOverlay
            searchRef={searchRef}
            inputRef={inputRef}
            query={query}
            handleInputChange={handleInputChange}
            closeSearch={closeSearch}
            isLoading={isLoading}
            results={results}
            recentSearches={recentSearches}
            trendingSearches={trendingSearches}
            handleSearchSelect={handleSearchSelect}
            handleTrendingSearch={handleTrendingSearch}
            getTypeIcon={getTypeIcon}
            getTypeLabel={getTypeLabel}
          />,
          document.body
        )}
    </>
  );
};

export default GlobalSearch;
