import { Link } from "react-router";

function HeroGrid() {
    return (
        <section className="relative px-4 lg:px-16 py-8 space-y-6">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/20 via-purple-50/10 to-rose-50/20 rounded-2xl"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-pink-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl"></div>

            {/* Main Hero Banner */}
            <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-pink-100 to-purple-100 border border-white/30 backdrop-blur-sm">
                    <img
                        src="assets/hero_image.png"
                        alt="Hero Banner"
                        className="object-cover w-full h-[400px] md:h-[450px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/0"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-16">
                        {/* Sale badge */}
                        <div className="my-4">
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow border border-white/20">
                                ✨ Summer Sale 30% OFF
                            </span>
                        </div>

                        {/* Main heading */}
                        <h1 className="text-5xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                            <span className="block bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                                Color of Summer Outfit
                            </span>
                            
                        </h1>

                        {/* Description */}
                        <div className="mb-6 bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-3xl">
                            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                                ✨ Discover <span className="text-pink-200 font-bold">100+ collections</span> for your summer outfit inspirations.
                                <br className="hidden sm:block" />
                                <span className="text-rose-200 font-semibold">Shop the latest trends now!</span>
                            </p>
                        </div>
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute top-10 right-10 w-5 h-5 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute top-24 right-20 w-3 h-3 bg-pink-300/50 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-4 h-4 bg-rose-300/40 rounded-full animate-bounce"></div>
                </div>
            </div>

            {/* Secondary Hero Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Outdoor Active */}
                <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-green-100 to-emerald-100 border border-white/30 backdrop-blur-sm h-[250px] md:h-[300px] lg:h-[350px]">
                        <img
                            src="assets/hero_image_1.png"
                            alt="Outdoor Active"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>

                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow border border-white/20">
                                    🌿 New Arrivals
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug mt-2">
                                <span className="block bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                                    Outdoor
                                </span>
                                <span className="block bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
                                    Active
                                </span>
                            </h2>

                            <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                <p className="text-white/90 text-sm sm:text-base font-medium">
                                    🌿 Adventure awaits with premium outdoor gear
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Casual Comfort */}
                <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-white/30 backdrop-blur-sm h-[250px] md:h-[300px] lg:h-[350px]">
                        <img
                            src="assets/hero_image_3.png"
                            alt="Casual Comfort"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>

                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                            <div className="mt-4">
                                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow border border-white/20 animate-pulse">
                                    ✨ Trending
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug mt-2">
                                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                    Casual
                                </span>
                                <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                    Comfort
                                </span>
                            </h2>

                            <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                <p className="text-white/90 text-sm sm:text-base font-medium">
                                    ✨ Everyday elegance meets ultimate comfort
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroGrid;
