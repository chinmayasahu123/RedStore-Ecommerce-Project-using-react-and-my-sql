const SkeletonCard = () => (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full"></div>
        <div className="p-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="flex justify-between">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
             <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
        </div>
    </div>
);

export default SkeletonCard;