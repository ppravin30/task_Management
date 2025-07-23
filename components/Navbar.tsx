 import Link from 'next/link';
 import styles from './navbar.module.css';

 const Navbar = () => {
    return(
        <header>
            <nav className={styles.nav}>
                <Link href = "/">
                    <p>Task Management</p>
                </Link>

                <ul className={styles.links}>
                    <Link href = "/create-task">
                        <li>Create</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
 }

 export default Navbar;