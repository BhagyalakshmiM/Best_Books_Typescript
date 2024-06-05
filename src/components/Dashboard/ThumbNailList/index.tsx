import Link from '@mui/material/Link';
import { useState, useEffect } from 'react';
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
    const searchStr = useAppSelector(state => state.booListStore.searchStr);
    const [list, setList] = useState<Array<ImageObjectProp>>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (searchStr) {
            const filteredArray = imageListProp?.filter((item) => {
                if (item.title.includes(searchStr) || item.author.includes(searchStr)) {
                    return item;
                }
            });
            filteredArray?.length ? setList(filteredArray) : setList([]);
            console.log(filteredArray);
        } else {
            setList(imageListProp);
        }
    }, [searchStr]);
    useEffect(() => {
        setList(imageListProp);
    }, [imageListProp]);
    const handleLinkClick = () => {
        if (linkName !== 'Favorites') {
            dispatch(setBookList(imageListProp));
            pageChanged && pageChanged(true);
        } else {
            navigate('/favorite');
        }
    }
    return (
        <><div className={styles.LinkIconWrapper}><Link
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
                mt: '15px',
                mb: '17px'
            }}
            onClick={(e) => {
                handleLinkClick();
            }}>
            {linkName}
        </Link>
           {linkName !== 'Favorites' && <IconButton aria-label="retry" onClick={() => refetchAPI && refetchAPI()}>
                <RetryButton />
            </IconButton>}</div>
            {list.length && <ImageList cols={3} gap={30} sx={{ m: '0px', height: '204px' }}>
                {list?.map((item) => (
                    <ImageListItem key={item.primary_isbn13}>
                        <img
                            className={styles.ImgEle}
                            style={{ opacity: linkName !== 'Favorites' ? '70%' : '1' }}
                            src={item.book_image}
                            alt={item.title}
                            loading="lazy" />
                    </ImageListItem>
                ))}
            </ImageList>}</>
    );
}

export default ThumbNailList;