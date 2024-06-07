import React from "react";
import prisma from "../lib/db";
import NoItems from "../components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ListingCard from "../components/ListingCard";
import { redirect } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache"

async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Hotel: {
        select: {
          id: true,
          country: true,
          photo: true,
          description: true,
          price: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
}

const Reservations = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold">Your Reservations</h2>

      {data.length === 0 ? (
        <NoItems
          title="You do not have any bookings yet!"
          description="Please add some bookings to see here..."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
          {data.map((item) => (
            <ListingCard
              key={item.Hotel?.id}
              description={item.Hotel?.description as string}
              price={item.Hotel?.price as number}
              location={item.Hotel?.country as string}
              homeId={item.Hotel?.id as string}
              pathname={"/favorites"}
              imagePath={item.Hotel?.photo as string}
              userId={user.id}
              favoriteId={item.Hotel?.Favorite[0]?.id as string}
              isFavorite={
                (item.Hotel?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Reservations;
