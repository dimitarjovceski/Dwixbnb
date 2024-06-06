import { Suspense } from "react";
import FilterCategories from "./components/FilterCategories";
import ListingCard from "./components/ListingCard";
import prisma from "./lib/db";
import NoItems from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

async function getData({
  userId,
  searchParams,
}: {
  userId: string | undefined;
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

      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  return (
    <div className="mx-auto px-4 lg:px-[200px]">
      <FilterCategories />

      <Suspense
        key={searchParams?.filter}
        fallback={
          <p className="text-center text-2xl font-bold mt-10">Loading...</p>
        }
      >
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
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="No found homes with that category!"
          description="Please search for another category..."
        />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              price={item.price as number}
              imagePath={item.photo as string}
              location={item.country as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isFavorite={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathname={"/"}
            />
          ))}
        </div>
      )}
    </>
  );
}
