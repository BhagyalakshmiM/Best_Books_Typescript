import Link from '@mui/material/Link';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ImageList from '@mui/material/ImageList';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { setBookList } from "../../../Redux/bookListSlice";
import { ImageObjectProp, LinkNameListProps } from '../../../Types/types';
import { RetryButton } from '../../../Assets/NavigationIcons';
import styles from './index.module.css';

const ThumbNailList = ({ linkName, imageListProp, pageChanged, refetchAPI }: LinkNameListProps) => {
    const dispatch = useAppDispatch();
    // getting search string from store
    const searchStr = useAppSelector(state => state.booListStore.searchStr);
    const [list, setList] = useState<Array<ImageObjectProp>>([]);
    // rendering empty screen or data by checking array length
    const getComponentOrEmptyComp = () => {
        let comp;
        if (imageListProp.length === 0 || list.length === 0) {
            comp = (
                <Alert severity="info" sx={{ width: '50%', m: '60px auto'}}>
                    <AlertTitle>Info</AlertTitle>
                    Currently no books available
                </Alert>
            );
        } else {
            comp = (
                <ImageList className={styles.CustomScrollBar} cols={3} gap={30} sx={{ m: '0px 0px 15px 0px', height: '204px' }}>
                    {list?.map((item) => (
                        <ImageListItem key={item.primary_isbn13}>
                            <img
                                style={{ opacity: linkName !== 'Favorites' ? '70%' : '1' }}
                                src={item.book_image}
                                alt={item.title}
                                loading="lazy" />
                        </ImageListItem>
                    ))}
                </ImageList>
            );
        }
        return comp;
    }
    const navigate = useNavigate();
    // using title/author/description to filter the array using search string 
    useEffect(() => {
        if (searchStr) {
            const filteredArray = imageListProp?.filter((item) => {
                if (((item.title).toLocaleLowerCase()).includes(searchStr.toLocaleLowerCase()) || ((item.author).toLocaleLowerCase()).includes(searchStr.toLocaleLowerCase())) {
                    return item;
                }
            });
            filteredArray?.length ? setList(filteredArray) : setList([]);
        } else {
            setList(imageListProp);
        }
    }, [searchStr]);
    useEffect(() => {
        setList(imageListProp);
    }, [imageListProp]);
    // on Link click going too second page based on link clicked
    const handleLinkClick = () => {
        if (linkName !== 'Favorites') {
            dispatch(setBookList(imageListProp));
            pageChanged && pageChanged(true);
        } else {
            navigate('/favorite');
        }
    }
    return (
        <><div><Link
            component="button"
            variant="body2"
            color='#454664'
            underline='hover'
            sx={{
                fontFamily: 'Lato',
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '20px',
                textAlign: 'left',
                mb: '17px'
            }}
            onClick={(e) => {
                handleLinkClick();
            }}>
            {linkName}
        </Link>
            {linkName !== 'Favorites' && <IconButton aria-label="retry" sx={{ mb: '15px' }} onClick={() => refetchAPI && refetchAPI()}>
                <RetryButton />
            </IconButton>}</div>
            {getComponentOrEmptyComp()}</>
    );
}

export default ThumbNailList;