import FaIcon from "./FaIcon";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: any;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      className="relative flex items-center animate-scale-in border border-btn-border rounded-lg px-2"
      style={{ animationDelay: "0.2s" }}
    >
      <button className="size-10">
        <FaIcon name="magnifying-glass" light />
      </button>
      <input
        type="text"
        placeholder="Busca Proyectos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-2 text-font text-lg focus:outline-none shadow-2xl transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <FaIcon name="xmark" size="size-5" />
        </button>
      )}
    </div>
  );
};

export default Search;
