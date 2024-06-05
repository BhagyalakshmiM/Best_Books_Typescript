import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { StatsIcon, FavoriteIcon, SettingsIcon } from '../../Assets/NavigationIcons';
import styles from './sideNavigation.module.css';
import Header from '../Header/header';

type SideNavigationIcons = {
    key: string;
    component: React.ComponentType<any>;
    path: string;
}

export const topIcons: SideNavigationIcons[] = [
    {
        key: 'Home',
        path: '/',
        component: StatsIcon,
    },
    {
        key: 'Favorites',
        path: '/favorite',
        component: FavoriteIcon,
    },
    {
        key: 'Dashboard',
        path: '/setting',
        component: SettingsIcon,
    }
];


const SideNavigation = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    // setting the path when side navigation items are clicked
    const handleNavButton: Function = (path: string): void => {
        navigate(path);
    }
    return (
        <>
            <Header />
            <List className={styles.ListContainer} disablePadding>
                {topIcons.map((ele) => {
                    return (
                        <div key={ele.key} className={location.pathname === ele.path ? styles.ListWrapperSelected : styles.ListWrapper}>
                        <ListItem divider disablePadding>
                            <ListItemButton disableGutters disableRipple onClick={() => handleNavButton(ele.path)} sx={{ flexGrow: 0, backgroundColor: 'transparent !important' }}>
                                <ListItemIcon sx={{ minWidth: 0 }}>
                                    <ele.component />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                        </div>
                        );
                })
                }
            </List>
        </>
    )
}

export default SideNavigation;