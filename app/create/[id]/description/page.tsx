import { createDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreateBottomBar from "@/app/components/CreateBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DescriptionPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-full">
        <h2 className="w-3/5 mx-auto text-3xl font-semibold tracking-tight">
          Please describe your home the best you can!
        </h2>

        <form action={createDescription}>
          <div className="w-3/5 mx-auto gap-y-8">
            <input type="hidden" name="homeId" value={params.id} />
            <div className="flex flex-col mt-10 gap-y-7 mb-36">
              <div className="flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  required
                  placeholder="Provide a Title"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  required
                  placeholder="Describe your home..."
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  required
                  placeholder="Price per Night"
                  min={10}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Image</Label>
                <Input
                  type="file"
                  name="image"
                  required
                  placeholder="Provide an Image"
                />
              </div>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-semibold">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name="guests" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-semibold">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms do you have?
                      </p>
                    </div>
                    <Counter name="rooms" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-semibold">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms do you have?
                      </p>
                    </div>
                    <Counter name="bathrooms" />
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
          <CreateBottomBar />
        </form>
      </div>
    </>
  );
};

export default DescriptionPage;
