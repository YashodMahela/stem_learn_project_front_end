import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className="bg-black py-6">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <p className="text-rose-500 font-extrabold text-lg tracking-tight">
          © 2025 <span className="text-rose-600">STEM</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
