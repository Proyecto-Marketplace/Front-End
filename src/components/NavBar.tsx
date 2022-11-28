import Link from "next/link"
import { BiHelpCircle, BiUser,  BiHeart, BiCart } from "react-icons/bi";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="w-full h-14 bg-slate-50 px-10 text-black">
       <div className="flex justify-between font-semibold">
       <Link href='#' className="inline-flex items-center gap-2 border-r-2 border-gray-300 pr-3 text-gray-400 text-sm"><BiHelpCircle className="text-lg"/> Contact & Help</Link>
        <div className="inline-flex gap-2 border-l-2 cursor-pointer border-gray-300 pl-3   items-center text-gray-400 text-sm"><Image src='/es.webp' alt="es" width={20} height={20}/> <h2>Es</h2></div>
       </div>
        <div className="flex h-16 justify-between">
        <ul className="flex gap-4 py-1 h-10 font-semibold">
            <li><Link href="#" className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3" >Mujer</Link></li> 
            <li><Link href="#" className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3">Infantil</Link></li> 
            <li><Link href="#" className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3" >Hombre</Link></li> 
        </ul>
        <Image src='/logo.svg' className="w-[250px] h-[190px] relative top-[-87px]" alt="logo" width={500} height={500}/>
        <ul className="flex gap-4 py-1 h-10 font-semibold">
            <li className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3">
                <Link href="#" className="flex gap-3 items-center"><BiUser className=" text-xl"/>log in</Link>
            </li>
            <li className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3">
                <Link href="#" className="flex gap-3 items-center"><BiHeart className=" text-xl"/>Favorites</Link>
            </li>
            <li className="hover:text-slate-900 focus:text-slate-900 text-slate-400 focus:border-b-2 border-slate-800 pb-3">
                <Link href="#" className="flex gap-3 items-center"><BiCart className=" text-xl"/>shopping cart</Link>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default NavBar