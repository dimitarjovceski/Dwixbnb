"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const CreateButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
};

export default CreateButton;

export const AddToFavorite = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4 cursor-pointer" />
        </Button>
      )}
    </>
  );
};
export const DeleteFromFavorite = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size={"icon"}
          disabled
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4 cursor-pointer text-red-500" fill="#E21C49"  />
        </Button>
      )}
    </>
  );
};
