import Image from "next/image"
import Logo from "../../public/brand.png"
import UserNav from "./UserNav"
import SearchComponent from "./SearchComponent"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="w-full border-b">
        <div className="flex justify-between items-center container mx-auto mt-2 px-5 lg:px-10 py-5 lg:py-0">
           <Link href={"/"}> <Image className="object-cover w-20  hidden lg:block" src={Logo} alt="Logo" /></Link>
            <Image src={Logo} alt="Mobile Logo" className="block lg:hidden w-20"  />

            <div className="rounded-full border bg-blue-500 text-white px-5 py-2">
            <SearchComponent />

            </div>


            <UserNav />
        </div>
    </nav>
  )
}

export default Navbar