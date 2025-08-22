import HeroGrid from "../components/HeroGrid";
import CasualInspirations from "../components/CasualInspirations";

function HomePage() {
    return (
        <>
            <main className="flex flex-col gap-8 md:gap-12 pb-8">
                <HeroGrid />
                <CasualInspirations />
            </main>
        </>
    );
}

export default HomePage;