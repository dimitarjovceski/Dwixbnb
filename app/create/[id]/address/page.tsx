"use client";

import { createLocation } from "@/app/actions";
import CreateBottomBar from "@/app/components/CreateBottomBar";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

const AddressPage = ({ params }: { params: { id: string } }) => {
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries } = useCountries();

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[50vh]" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="font-semibold tracking-tight text-3xl mt-10">
          Which address is your home?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={locationValue} />
        <div className="w-3/5 mx-auto mt-5 mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <LazyMap locationValue={locationValue} />
        </div>
        <CreateBottomBar />
      </form>
    </>
  );
};

export default AddressPage;
