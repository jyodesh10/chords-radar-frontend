export default function LoadingState () {
    return (
        <div className="max-w-4xl mx-auto bg-neutral-900 animate-pulse min-h-screen">
            {/* Header Section Skeleton */}
            <div className="bg-teal-800 p-10">
                <div className="flex items-center">
                    {/* Icon Skeleton */}
                    <div className="mr-4 h-[52px] w-[52px] bg-teal-700 rounded-xl"></div>
                    {/* Title and Artist Skeleton */}
                    <div>
                        <div className="h-6 w-48 bg-teal-700 rounded mb-2"></div>
                        <div className="h-4 w-32 bg-teal-700 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Options Section Skeleton */}
            <div className="flex mx-4 my-3 justify-end items-center">
                <div className="h-8 w-24 bg-teal-800 rounded-xl mr-2"></div>
                <div className="h-8 w-20 bg-teal-800 rounded-xl mr-2"></div>
                <div className="h-8 w-16 bg-teal-800 rounded-xl"></div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-3 pb-40 space-y-4">
                <div className="space-y-2">
                    <div className="h-4 bg-neutral-700 rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                    <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                </div>
                <div className="space-y-2 pt-4">
                    <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
                    <div className="h-4 bg-neutral-700 rounded w-2/3"></div>
                    <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                </div>
                <div className="space-y-2 pt-4">
                    <div className="h-4 bg-neutral-700 rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
                    <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    )
}