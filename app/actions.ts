"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createDwixbnbHome({ userId }: { userId: string }) {
  const data = await prisma.hotel.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.hotel.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data?.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data?.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/decription`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.hotel.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data?.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;
  const data = await prisma.hotel.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guests") as string;
  const roomsNumber = formData.get("rooms") as string;
  const bathRoomsNumber = formData.get("bathrooms") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.hotel.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      guests: guestNumber,
      bedrooms: roomsNumber,
      bathrooms: bathRoomsNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const country = formData.get("country") as string;
  const data = await prisma.hotel.update({
    where: {
      id: homeId,
    },
    data: {
      country: country,
      addedLocation: true,
    },
  });

  return redirect("/");
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathName = formData.get("pathname") as string;

  const data = await prisma.favorite.create({
    data: {
      userId: userId,
      hotelId: homeId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromFavorite(formData: FormData) {
  const userId = formData.get("userId") as string;
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathname") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const homeId = formData.get("homeId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      hotelId: homeId,
      startDate: startDate,
      endDate: endDate,
    },
  });

  return redirect("/api/auth/login");
}
