import Button from '@mui/material/Button';
import profileImg from '../../Assets/ProfileImg.jpeg';
import styles from './header.module.css';

const Header = (): JSX.Element => (
    <div className={styles.header}>
        <Button
            className={styles.profileImage}
            aria-label="Profile Image"
            onClick={() => { }}
        >
            <img src={profileImg} alt="Profile Image" />
        </Button>
        <span className={styles.title}><span className={styles.firstPart}>RAD</span>ICAL</span>
    </div>
)

export default Header;