import Image from "next/image";
import { useCountries } from "../lib/getCountries";

interface IAppProps {
  imagePath: string;
  description: string;
  price: number;
  location: string;
}

const ListingCard = ({
  imagePath,
  description,
  location,
  price,
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
      </div>

      <div>
        <h3 className="font-medium mt-1">
          {country?.label}/{country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
        </p>
        <p className="pt-2 text-muted-foreground">
            <span className="font-bold mr-1 text-black">
                ${price} 
            </span>
             per Night
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
