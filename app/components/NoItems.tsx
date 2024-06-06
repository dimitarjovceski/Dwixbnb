import { File } from "lucide-react";

interface IAppProps {
  title: string;
  description: string;
}

const NoItems = ({ title, description }: IAppProps) => {
  return (
    <div className="flex flex-col  min-h-[400px] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-8">
      <div className="p-8 bg-blue-100 rounded-full">
        <File />
      </div>
      <h2 className="mb-2 text-2xl">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default NoItems;
