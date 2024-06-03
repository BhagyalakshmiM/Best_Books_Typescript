import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Rating from "@mui/material/Rating";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import SearchInput from "../SearchInput";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { setBookFavoriteList } from "../../Redux/bookListSlice";
import { BookIcon, FavoriteEmptyIcon, FilledHeart } from "../../Assets/NavigationIcons";
import { ImageObjectProp } from "../../Types/types";
import styles from './index.module.css';
import { useEffect, useState } from "react";

const BookBestSellersList = () => {
    const list = useAppSelector(state => state.bookList.bookList);
    const favList = useAppSelector(state => state.bookList.bookFavoriteList);
    const [itemList, setItemList] = useState<Array<ImageObjectProp> | []>();
    const dispatch = useAppDispatch();
    const addBookToFavorite = (item: any) => {
        dispatch(setBookFavoriteList(item));
    };
    useEffect(() => {
        list && setItemList(list);
        // compare favList and list and update itemList
    }, [list]);
    return (
        <div className={styles.Wrapper}>
            <div className={styles.title}>New York Times Bestsellers</div>
            <SearchInput placeholder="Search" />
            <div className={styles.listWrapper}>
                <List dense disablePadding>
                    {itemList?.map((ele) =>
                        <ListItem sx={{ backgroundColor: '#FFFF', height: '52px', mb: '17px', pl: '6px' }}
                            secondaryAction={
                                    <IconButton onClick={() => addBookToFavorite(ele)} className={styles.favoriteIcon} edge="end" aria-label="favorite" sx={{ padding: '16px' }}>
                                        {ele.isFavorite ? <FilledHeart /> : <FavoriteEmptyIcon />}
                                    </IconButton>
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
                            <Rating
                                    name="book rank"
                                    readOnly
                                    value={parseInt(ele.rank)}
                                    precision={1}
                                    size="small"
                                    sx={{ mr: '51px'}} />
                                    <span className={styles.priceSpan}>{ele.price} GBP</span>
                        </ListItem>,
                    )}
                </List>
            </div>
        </div>
    )
}

export default BookBestSellersList;