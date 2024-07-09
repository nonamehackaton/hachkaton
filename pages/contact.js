import HeadTag from "../components/HeadTag";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/dist/client/image";
import Footer from "../components/Footer";
import { FcCustomerSupport, FcDebt, FcVoicePresentation } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/dist/client/link";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Contactez nous | CyberConnect"/>

              {/* ================= Header ================= */}
            <header className="header-bg">
                {/* ============== Navbar ============ */}
                <Navbar/>
            </header>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= First Section ================ */}
                <section className="container mx-auto lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3">
                    <div className="sm:my-12 max-w-2xl mx-auto">
                        <div>
                            <h2 className="text-[#0C4A6E] font-semibold text-5xl">
                                Contact us
                            </h2>

                            <div className="mt-7">
                                <h4 className="text-zinc-800 font-semibold text-3xl">
                                    Reach out anytime
                                </h4>

                                <div className="grid md:grid-cols-2 md:gap-6 gap-y-5 mt-5">
                                    {/* ================= First card ================ */}
                                    <Link href="#">
                                        <div className="flex space-x-2 bg-[#E6FAF6] py-3.5 px-3 justify-between rounded-xl cursor-pointer transition hover:bg-[#e0f5f0]">
                                            <div className="flex flex-col justify-between space-y-3">
                                                <h2 className="text-zinc-800 font-semibold text-[21px]">
                                                    Customer Support
                                                </h2>

                                                
                                                <a className="text-blue-800 font-semibold underline flex items-center transition hover:text-blue-900">
                                                    Visitez le centre d'aide
                                                    <FiArrowRight className="mt-1 ml-1"/>
                                                </a>
                                            </div>

                                            <div>
                                                <FcCustomerSupport className="sm:text-9xl text-6xl"/>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* ================= Second card ================ */}
                                    <Link href="#">
                                        <div className="flex space-x-2 bg-[#E6FAF6] py-3.5 px-3 justify-between rounded-xl cursor-pointer transition hover:bg-[#e0f5f0]">
                                            <div className="flex flex-col justify-between space-y-3">
                                                <h2 className="text-zinc-800 font-semibold text-[21px]">
                                                    Solution d'Entreprise
                                                </h2>

                                                <a className="text-blue-800 font-semibold underline flex items-center transition hover:text-blue-900">
                                                    X.x.X.x
                                                    <FiArrowRight className="mt-1 ml-1"/>
                                                </a>
                                            </div>

                                            <div>
                                                <FcDebt className="sm:text-9xl text-6xl"/>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* ================= Third card ================ */}
                                    <Link href="#">
                                        <div className="flex space-x-2 bg-[#E6FAF6] py-3.5 px-3 justify-between rounded-xl cursor-pointer transition hover:bg-[#e0f5f0]">
                                            <div className="flex flex-col justify-between space-y-3">
                                                <h2 className="text-zinc-800 font-semibold text-[21px]">
                                                    Contact Press
                                                </h2>

                                                <Link href="#">
                                                    <a className="text-blue-800 font-semibold underline flex items-center transition hover:text-blue-900">
                                                        press@CyberConnect.com
                                                        <FiArrowRight className="mt-1 ml-1"/>
                                                    </a>
                                                </Link>
                                            </div>

                                            <div>
                                                <FcVoicePresentation className="sm:text-9xl text-6xl"/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="mt-10 space-y-7">
                                    <h4 className="text-zinc-800 font-semibold text-3xl">
                                        Nos Bureaux
                                    </h4>

                                    {/* ================= First location ================ */}
                                    <div className="bg-[#E6FAF6] grid sm:grid-cols-2 rounded-lg">
                                        <Image
                                            src="/images/location-image.png"
                                            width={450}
                                            height={250}
                                            alt="location-image"
                                        />

                                        <div className="py-4 sm:px-5 px-4">
                                            <h4 className="text-zinc-800 font-semibold text-[21px]">
                                                Siège Social
                                            </h4>
                                            <div className="mt-2">
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    12 Avenue pas piquée des hanetons
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    Suite 185
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    Bordeaux
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    CA X.x.X.x
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    Phone: (650) 316-7500
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================= Second location ================ */}
                                    <div className="bg-[#E6FAF6] grid sm:grid-cols-2 rounded-lg">
                                        <Image
                                            src="/images/location-image.png"
                                            width={450}
                                            height={250}
                                            alt="location-image"
                                        />

                                        <div className="py-4 sm:px-5 px-4">
                                            <h4 className="text-zinc-800 font-semibold text-[21px]">
                                                X
                                            </h4>
                                            <div className="mt-2">
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                     {/* ================= Third location ================ */}
                                     <div className="bg-[#E6FAF6] grid sm:grid-cols-2 rounded-lg">
                                        <Image
                                            src="/images/location-image.png"
                                            width={450}
                                            height={250}
                                            alt="location-image"
                                        />

                                        <div className="py-4 sm:px-5 px-4">
                                            <h4 className="text-zinc-800 font-semibold text-[21px]">
                                               X
                                            </h4>
                                            <div className="mt-2">
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                                <p className="text-zinc-500 font-semibold text-[17px]">
                                                    X
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ==================== Footer ====================== */}
            <Footer/>
        </div>
    )
}

export default Contact;