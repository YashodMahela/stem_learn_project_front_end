import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>Mebius</div>
      <nav>
        <a href="">Shoes</a>
        <a href="">T-shirts</a>
        <a href="">Shorts</a>
        <a href="">Pants</a>
        <a href="">Socks</a>
      </nav>
      <div className={styles.controls}>
        <div className={styles.icons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search-icon lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-bag-icon lucide-shopping-bag"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <a href="">Sign In</a>
        <a href="">Sign Up</a>
      </div>
    </header>
  );
}

export default Navigation;
