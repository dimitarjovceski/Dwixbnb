import { File } from "lucide-react"

const NoItems = () => {
  return (
    <div className="flex flex-col  min-h-[400px] items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
        <h2 className="mb-2 text-2xl">Currently no Homes in that category!</h2>
        <div className="p-8 bg-blue-100 rounded-full">
            <File />
        </div>
    </div>
  )
}

export default NoItems