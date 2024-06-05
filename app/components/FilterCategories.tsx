"use client"

import Link from "next/link";
import { categoryItems } from "../lib/categoryFilters";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const FilterCategories = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex mx-auto gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
        className={cn(
            search === item.name ? "border-b-2 pb-2 border-black flex-shrink-0" : "opacity-70 flex-shrink-0", "flex flex-col gap-y-3 items-center"
        )}
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
        >
          <div className="relative w-6 h-6">
            <Image
              src={item.imageUrl}
              alt="category image"
              width={24}
              height={24}
            />
          </div>
          <p className="text-sm font-medium">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default FilterCategories;
