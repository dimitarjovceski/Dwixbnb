import { Suspense } from "react";
import FilterCategories from "./components/FilterCategories";
import ListingCard from "./components/ListingCard";
import prisma from "./lib/db";
import NoItems from "./components/NoItems";

async function getData({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await prisma.hotel.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      description: true,
      price: true,
      country: true,
    },
  });

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await getData({ searchParams: searchParams });

  return (
    <div className="mx-auto px-4 lg:px-[200px]">
      <FilterCategories />

      <Suspense key={searchParams?.filter} fallback={<p className="text-center text-2xl font-bold mt-10">Loading...</p>}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await getData({ searchParams: searchParams });

  return (
   <>
   {data.length === 0 ? (
    <NoItems />
   ) : (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
    {data.map((item) => (
      <ListingCard
        key={item.id}
        description={item.description as string}
        price={item.price as number}
        imagePath={item.photo as string}
        location={item.country as string}
      />
    ))}
  </div>
   )}
   </>
  );
}
