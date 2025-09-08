import { Link } from "react-router";

function HeroGrid() {
    return (
        <section className="relative px-4 lg:px-16 py-8 space-y-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-rose-50/30 rounded-3xl"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
            
            {/* Main Hero Banner - Full Width Cover */}
            <div className="relative group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-100 to-purple-100 border border-white/50 backdrop-blur-sm">
                    <img
                        src="assets/hero_image.png"
                        alt="Hero Banner"
                        className="object-cover w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Enhanced gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 sm:px-12 lg:px-16 xl:px-20">
                        {/* Sale badge with enhanced visibility */}
                        <div className="my-6">
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full text-base font-bold shadow-xl animate-pulse border-2 border-white/20">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                Summer Sale 30% OFF
                            </span>
                        </div>
                        
                        {/* Main heading with enhanced typography */}
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-[0.85] mb-8">
                            <span className="block bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
                                Color of
                            </span>
                            <span className="block bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent drop-shadow-2xl">
                                Summer
                            </span>
                            <span className="block bg-gradient-to-r from-rose-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                Outfit
                            </span>
                        </h1>
                        
                        {/* Description with better readability */}
                        <div className="mb-10 bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-4xl">
                            <p className="text-white text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium">
                                ✨ Discover <span className="text-pink-200 font-bold">100+ collections</span> for your summer outfit inspirations.
                                <br className="hidden sm:block" />
                                <span className="text-rose-200 font-semibold">Shop the latest trends now!</span>
                            </p>
                        </div>
                        
                        {/* CTA buttons */}
                        {/* <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                to="/shop"
                                className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-xl flex items-center justify-center gap-3 border-2 border-white/20"
                            >
                                <span className="relative z-10">Shop Now</span>
                                <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </Link>
                            
                            <Link
                                to="/collections"
                                className="px-10 py-5 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-xl flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white/50"
                            >
                                <span>View Collections</span>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </Link>
                        </div> */}
                    </div>
                    
                    {/* Floating elements for extra appeal */}
                    <div className="absolute top-10 right-10 w-6 h-6 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute top-24 right-20 w-3 h-3 bg-pink-300/50 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-4 h-4 bg-rose-300/40 rounded-full animate-bounce"></div>
                </div>
            </div>

            {/* Secondary Hero Sections - Stacked Vertically */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Outdoor Active */}
                <div className="relative group">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-emerald-100 border border-white/50 backdrop-blur-sm h-[300px] md:h-[350px] lg:h-[400px]">
                        <img
                            src="assets/hero_image_1.png"
                            alt="Outdoor Active"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Enhanced gradient for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                            <div className="mt-6">
                                <span className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    New Arrivals
                                </span>
                            </div>
                            
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
                                <span className="block bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent drop-shadow-lg">
                                    Outdoor
                                </span>
                                <span className="block bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                                    Active
                                </span>
                            </h2>
                            
                            <div className="mb-6 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <p className="text-white/90 text-lg font-medium">🌿 Adventure awaits with premium outdoor gear</p>
                            </div>
                            
                            {/* Enhanced CTA button */}
                            <Link
                                to="/shop"
                                className="group px-8 py-3 mb-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 border-2 border-white/20"
                            >
                                <span>Explore Collection</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-6 right-6 w-4 h-4 bg-emerald-400/50 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-6 left-6 w-3 h-3 bg-green-400/40 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>

                {/* Casual Comfort */}
                <div className="relative group">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-white/50 backdrop-blur-sm h-[300px] md:h-[350px] lg:h-[400px]">
                        <img
                            src="assets/hero_image_3.png"
                            alt="Casual Comfort"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Enhanced gradient for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
                            <div className="mt-6">
                                <span className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl border border-white/20 animate-pulse">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Trending
                                </span>
                            </div>
                            
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
                                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                                    Casual
                                </span>
                                <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                                    Comfort
                                </span>
                            </h2>
                            
                            <div className="mb-6 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <p className="text-white/90 text-lg font-medium">✨ Everyday elegance meets ultimate comfort</p>
                            </div>
                            
                            {/* Enhanced CTA button */}
                            <button
                                onClick={() => {
                                    const trendingSection = document.querySelector('.trending-section');
                                    if (trendingSection) {
                                        trendingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className="group px-8 py-3 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3 border-2 border-white/20"
                            >
                                <span>Explore Collection</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-6 right-6 w-4 h-4 bg-blue-400/50 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-6 left-6 w-3 h-3 bg-indigo-400/40 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroGrid;