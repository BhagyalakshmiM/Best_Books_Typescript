import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Rating from "@mui/material/Rating";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchInput from "../SearchInput";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { removeBookFavoriteList, setBookFavoriteList } from "../../Redux/bookListSlice";
import { BookIcon, FavoriteEmptyIcon, FilledHeart, ArrowBack } from "../../Assets/NavigationIcons";
import { ImageObjectProp } from "../../Types/types";
import styles from './index.module.css';
import { useEffect, useState } from "react";

type BookBestSellersProp = {
    setPage?: Function;
    setEditItem?: Function;
    title: string;
    list: Array<ImageObjectProp>;
    favBookList?: Array<ImageObjectProp>;
}

const BookBestSellersList = ({ setPage, title, list, favBookList, setEditItem }: BookBestSellersProp) => {
    const searchStr = useAppSelector(state => state.booListStore.searchStr);
    const [itemList, setItemList] = useState<Array<ImageObjectProp> | []>();
    const isFavoritePage = title === 'Favorites';
    const dispatch = useAppDispatch();
    const addBookToFavorite = (item: ImageObjectProp) => {
        item.isFavorite ? dispatch(removeBookFavoriteList(item)) : dispatch(setBookFavoriteList({ ...item, isFavorite: true }));
    };
    const handleEditClick = (item: ImageObjectProp) => {
        setEditItem && setEditItem(item);
    }
    useEffect(() => {
        if (searchStr) {
            const filteredArray = itemList?.filter((item) => {
                if (((item.title).toLocaleLowerCase()).includes(searchStr.toLocaleLowerCase()) || ((item.author).toLocaleLowerCase()).includes((searchStr.toLocaleLowerCase())) || (!isFavoritePage && ((item.description).toLocaleLowerCase()).includes((searchStr.toLocaleLowerCase())))) {
                    return item;
                }
            });
            filteredArray?.length ? setItemList(filteredArray) : setItemList([]);
        } else {
            handleFavoritePageList();
        }
    }, [searchStr]);

    const handleFavoritePageList = () => {
        if (list.length && !isFavoritePage && favBookList?.length) {
            // compare favList and list and update itemList
            const temp = list.map((ele) => {
                return favBookList?.find((e) => e.primary_isbn13 === ele.primary_isbn13) ?? ele;
            });
            setItemList(temp);
        } else {
            setItemList(list);
        }
    }
    useEffect(() => {
        handleFavoritePageList();
    }, [list, favBookList]);
    return (
        <div className={styles.Wrapper}>
            <div className={styles.title}>
                {setPage && <IconButton onClick={() => setPage(false)} aria-label="back-arrow" sx={{ mr: '8px' }}>
                    <ArrowBack />
                </IconButton>}
                <span>{title}</span>
            </div>
            <SearchInput placeholder="Search" />
            <div className={styles.listWrapper}>
                <List dense disablePadding sx={{ overflow: 'auto', height: '405px' }}>
                    {itemList?.length ? itemList?.map((ele) =>
                        <ListItem key={ele.primary_isbn13} sx={{ backgroundColor: '#FFFF', height: '52px', mb: '17px', pl: '6px' }}
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
                            <div className={isFavoritePage ? styles.itemButtonReverse : styles.itemButtonWrapper} >
                                <Rating
                                    name="book rank"
                                    readOnly
                                    value={ele.rank}
                                    precision={1}
                                    size="small"
                                    sx={{ mr: '5.8%' }} />
                                <span className={styles.priceSpan}>{parseFloat(ele.price)} GBP</span>
                            </div>
                            {isFavoritePage &&
                                <Stack spacing={1} direction="row" sx={{ mr: '15px' }}>
                                    <Button variant="text" className={styles.ButtonText} onClick={() => { handleEditClick(ele) }}>Edit</Button>
                                    <Button variant="text" className={styles.ButtonText} onClick={() => addBookToFavorite(ele)}>Delete</Button>
                                </Stack>}
                        </ListItem>,
                    ):  <Alert severity="info" sx={{ width: '50%', m: '60px auto'}}>
                    <AlertTitle>Info</AlertTitle>
                    Currently no books available
                </Alert>}
                </List>
            </div>
        </div>
    )
}

export default BookBestSellersList;