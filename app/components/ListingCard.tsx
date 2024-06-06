import Image from "next/image";
import { useCountries } from "../lib/getCountries";
import { Heart } from "lucide-react";
import { AddToFavorite, DeleteFromFavorite } from "./SubmitButtons";
import { addToFavorite, deleteFromFavorite } from "../actions";
import Link from "next/link";

interface IAppProps {
  imagePath: string;
  description: string;
  price: number;
  location: string;
  userId: string | undefined;
  isFavorite: boolean;
  favoriteId: string;
  homeId: string;
  pathname: string;
}

const ListingCard = ({
  imagePath,
  description,
  location,
  price,
  userId,
  isFavorite,
  favoriteId,
  homeId,
  pathname,
}: IAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://aslufihfurxijfmbwjbm.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2 ">
            {isFavorite ? (
              <form action={deleteFromFavorite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavorite />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavorite />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`}>
        <h3 className="font-medium mt-1">
          {country?.label}/{country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-bold mr-1 text-black">${price}</span>
          per Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
