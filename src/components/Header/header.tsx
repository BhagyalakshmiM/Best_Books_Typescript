import styles from './header.module.css';

const Header = (): JSX.Element => (
        <div className={styles.header}>
            <span className={styles.title}><span className={styles.firstPart}>RAD</span>ICAL</span>
        </div>
        )

export default Header;