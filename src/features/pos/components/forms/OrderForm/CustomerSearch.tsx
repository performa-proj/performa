export const CustomerSearch = () => {
  return (
    <div className="flex grow items-center justify-center gap-2">
      <p className="hidden sm:block text-sm/6 font-medium select-none text-gray-900 dark:text-white">Customer</p>
      <div className="flex grow">
        <input
          name="customer-query"
          type="text"
          className="block grow rounded-l-md -mr-px px-3 py-1.5 text-sm/6 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 bg-white text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:placeholder:text-gray-500 dark:focus:outline-blue-500 focus-within:relative"
          placeholder="Customer Mobile"
          autoComplete="off"
        />
        <button
          type="button"
          className="flex shrink-0 items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-white/10 dark:text-white dark:outline-gray-700 dark:hover:bg-white/20 dark:focus:outline-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
};