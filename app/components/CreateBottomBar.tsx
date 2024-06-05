import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateButton from "./SubmitButtons";

const CreateBottomBar = () => {
  return (
    <div className="fixed w-full  bottom-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button>
          <Link href="/">Cancel</Link>
        </Button>
        <CreateButton />
      </div>
    </div>
  );
};

export default CreateBottomBar;
