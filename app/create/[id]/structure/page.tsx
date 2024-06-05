import { createCategoryPage } from "@/app/actions";
import CreateBottomBar from "@/app/components/CreateBottomBar";
import SelectedCategory from "@/app/components/SelectedCategory";

const StructureRoute = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold">
          Which of these best describes your hotel?{" "}
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />

       <CreateBottomBar />
      </form>
    </>
  );
};

export default StructureRoute;
