import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative dark:text-white text-black">
      <Skeleton className="relative h-[500px] w-full bg-gray-200 overflow-hidden rounded-lg border-none outline-none shadow-none"></Skeleton>
      <div className="flex gap-2 justify-center mt-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-1 py-1  px-4 rounded-full  transition-all duration-300 cursor-pointer w-4 bg-gray-200 dark:bg-purple-100`}
          ></Skeleton>
        ))}
      </div>
    </div>
  );
}
