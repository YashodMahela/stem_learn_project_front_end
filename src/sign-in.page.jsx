import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <SignIn />
        </main>
    );
}

export default SignInPage;