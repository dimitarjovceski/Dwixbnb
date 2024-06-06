import CategoryShow from "@/app/components/CategoryShow";
import HomeMap from "@/app/components/HomeMap";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function getData(homeId: string) {
  const data = await prisma.hotel.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      categoryName: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      price: true,
      country: true,
      User: {
        select: {
          profilePicture: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

const HomeDetailPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="text-2xl font-semibold tracking-tight mb-5">
        {data?.title}
      </h1>

      <div className="relative h-[550px]">
        <Image
          className="rounded-lg object-cover w-full h-full "
          fill
          alt="Image of Home"
          src={`https://aslufihfurxijfmbwjbm.supabase.co/storage/v1/object/public/images/${data?.photo}`}
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-5">
        <div className="w-2/3 ">
          <h3 className="font-medium text-xl">
            {country?.label} / {country?.region}
          </h3>

          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>

          <div className="flex items-center mt-5">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={data?.User?.profilePicture ?? "/user.webp"}
            />
            <div className="flex flex-col">
              <h3 className="ml-2 font-bold">
                Hosted by {data?.User?.firstName}
              </h3>
            </div>
          </div>

          <Separator className="my-7" />

          <CategoryShow categoryName={data?.categoryName as string} />

          <Separator className="my-7" />

          <p className="text-sm text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />

          <HomeMap locationValue={country?.value as string} />
        </div>
      </div>
    </div>
  );
};

export default HomeDetailPage;
