import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4  dark:text-white text-black mb-4">
      <Skeleton className="md:h-[500px] xs:h-[350px] h-[200px] w-full  overflow-hidden rounded-lg border-none outline-none shadow-none"></Skeleton>
      <div className="flex gap-2 justify-center mt-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-1 py-1  px-4 rounded-full  transition-all duration-300 cursor-pointer w-4`}
          ></Skeleton>
        ))}
      </div>
    </div>
  );
}
