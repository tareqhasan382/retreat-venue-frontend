export function VenueSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="h-52 bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 w-2/3 rounded"></div>
                        <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
                        <div className="h-3 bg-gray-300 w-1/3 rounded"></div>
                        <div className="h-10 bg-gray-300 rounded mt-4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}