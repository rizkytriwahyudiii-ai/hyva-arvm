'use client';
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Desktop: search bar biasa */}
      <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-gray-100/50 rounded-full px-3 py-2 border border-gray-200 hover:border-black hover:bg-white transition-all duration-300">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari parfum..."
          className="bg-transparent text-[11px] font-medium outline-none w-28 md:w-40 transition-all duration-500 tracking-[0.05em] text-gray-700 placeholder:text-gray-400"
        />
        <button type="submit">
          <Search size={15} className="text-gray-400 ml-2 cursor-pointer hover:text-black" />
        </button>
      </form>

      {/* Mobile: ikon saja, expand saat diklik */}
      <div className="sm:hidden relative">
        {expanded ? (
          <form onSubmit={handleSearch} className="fixed top-0 left-0 right-0 z-[150] bg-white px-4 py-4 border-b border-gray-200 flex items-center gap-3 shadow-md">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari parfum..."
              autoFocus
              className="flex-1 text-[14px] outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button type="button" onClick={() => { setExpanded(false); setQuery(''); }}>
              <X size={18} className="text-gray-500" />
            </button>
          </form>
        ) : (
          <button onClick={() => setExpanded(true)} className="p-1">
            <Search size={20} className="text-gray-700" />
          </button>
        )}
      </div>
    </>
  );
}