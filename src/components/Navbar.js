import { Link } from "react-router-dom"
import { TbUserCircle } from "react-icons/tb"


const Navbar = () => {
  return (
    <nav className="flex items-center justify-end flex-wrap bg-gray-600 px-8 py-2 mb-5">
      <div>
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block lg:inline-block lg:mt-0 text-white hover:text-gray-300 text-5xl"
          >
            <TbUserCircle />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
