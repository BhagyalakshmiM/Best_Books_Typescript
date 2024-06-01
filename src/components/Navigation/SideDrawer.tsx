import profileImg from '../../Assets/Images/ProfileImg.jpeg';
import styles from './sideDrawer.module.css';

const SideDrawer = () : JSX.Element => {
    return (
        <div>
        <button className={styles.profileImage}><img src={profileImg} alt="Profile Image" /></button>
        </div>
    )
}

export default SideDrawer;