import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Rating from "@mui/material/Rating";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import SearchInput from "../SearchInput";
import { useAppSelector } from "../../Redux/hooks";
import { BookIcon, FavoriteEmptyIcon, ReviewEmptyStar, FilledStar } from "../../Assets/NavigationIcons";
import styles from './index.module.css';

const BookBestSellersList = () => {
    const list = useAppSelector(state => state.bookList.bookList);
    return (
        <div className={styles.Wrapper}>
            <div className={styles.title}>New York Times Bestsellers</div>
            <SearchInput placeholder="Search" />
            <div className={styles.listWrapper}>
                <List dense disablePadding>
                    {list.map((ele) =>
                        <ListItem sx={{ backgroundColor: '#FFFF', height: '52px', mb: '17px', pl: '6px', alignSelf: 'center !important' }}
                            secondaryAction={
                                <div className={styles.listEndItems}><Rating
                                    name="book rank"
                                    readOnly
                                    value={parseInt(ele.rank)}
                                    precision={1} /><span>{ele.price} GBP</span><IconButton edge="end" aria-label="favorite" sx={{ padding: '16px' }}>
                                        <FavoriteEmptyIcon />
                                    </IconButton></div>
                            }
                        >
                            <ListItemAvatar sx={{ minWidth: '44px' }}>
                                <Avatar sx={{ backgroundColor: "transparent" }}>
                                    <BookIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText}
                                primary={ele.title}
                                secondary={ele.contributor}
                            >
                            </ListItemText>
                        </ListItem>,
                    )}
                </List>
            </div>
        </div>
    )
}

export default BookBestSellersList;