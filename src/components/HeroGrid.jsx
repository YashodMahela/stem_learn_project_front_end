function HeroGrid() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 min-h-[50vh] md:min-h-[70vh] gap-4 mt-4">
            {/* Hero banner*/}
            <div className="relative col-span-1 lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
                {/* Background Image */}
                <img
                    src="src/assets/hero_image.png"
                    alt="Hero Banner"
                    className="object-cover w-full h-[400px] md:h-[600px] lg:h-[500px] scale-105 transition-transform duration-700 hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
                        Color of <br />
                        Summer <br />
                        Outfit
                    </h1>

                    <p className="text-white/90 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-lg leading-relaxed">
                        100+ Collections for your outfit inspirations <br />
                        in this summer.
                    </p>

                    <div className="mt-6 sm:mt-8">
                        <button className="px-6 py-3 bg-pink-900 hover:bg-gray-400 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>
            {/* Hero image 02 */}
            <div className="col-span-1 grid grid-rows-1 md:grid-rows-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <img
                        src="src/assets/hero_image_1.png"
                        alt="Hero Banner"
                        className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>

                    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-12 lg:px-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                            Outdoor
                            Active
                        </h2>
                    </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <img
                        src="src/assets/hero_image_3.png"
                        alt="Hero Banner"
                        className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-12 lg:px-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                            Casual
                            Comfort
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroGrid;
