import Image from "next/image"
import Logo from "../../public/logo1.png"
import MobileLogo from "../../public/airbnb.webp"
import UserNav from "./UserNav"

const Navbar = () => {
  return (
    <nav className="w-full border-b">
        <div className="flex justify-between items-center container mx-auto px-5 lg:px-10 py-5 lg:py-0">
            <Image className="object-cover w-32 hidden lg:block" src={Logo} alt="Logo" />
            <Image src={MobileLogo} alt="Mobile Logo" className="block lg:hidden w-20"  />

            <div className="rounded-full border px-5 py-2">
              <h1>Hello from the search</h1>
            </div>

            <UserNav />
        </div>
    </nav>
  )
}

export default Navbar