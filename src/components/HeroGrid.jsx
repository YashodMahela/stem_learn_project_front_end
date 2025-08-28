import { Link } from "react-router";

function HeroGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 min-h-[60vh] md:min-h-[80vh] gap-6 mt-8">
            {/* Main Hero Banner */}
            <div className="relative col-span-1 lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl group">
                <img
                    src="assets/hero_image.png"
                    alt="Hero Banner"
                    className="object-cover w-full h-[420px] md:h-[600px] lg:h-[520px] scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
                    <span className="bg-pink-700/80 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit shadow-lg animate-bounce">
                        Summer Sale 30% OFF
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight drop-shadow-xl mb-4">
                        Color of <br />
                        Summer <br />
                        Outfit
                    </h1>
                    <p className="text-white/90 text-lg sm:text-xl md:text-2xl mt-2 sm:mt-4 max-w-xl leading-relaxed">
                        Discover 100+ collections for your summer outfit inspirations. <br />
                        Shop the latest trends now!
                    </p>
                    <div className="mt-8 flex gap-4">
                        <Link
                            to="/shop"
                            className="px-8 py-3 bg-pink-700 hover:bg-pink-900 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl text-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
            {/* Side Hero Images */}
            <div className="col-span-1 grid grid-rows-2 gap-6">
                {/* Outdoor Active */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                        src="assets/hero_image_1.png"
                        alt="Outdoor Active"
                        className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
                        <span className="bg-rose-600/80 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 w-fit shadow-md animate-pulse">
                            New Arrivals
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-2">
                            Outdoor Active
                        </h2>
                    </div>
                </div>
                {/* Casual Comfort */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                        src="assets/hero_image_3.png"
                        alt="Casual Comfort"
                        className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8">
                        <span className="bg-rose-600/80 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 w-fit shadow-md animate-pulse">
                            Trending
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-2">
                            Casual Comfort
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroGrid;
