import Link from '@mui/material/Link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useAppDispatch } from '../../../Redux/hooks';
import { setBookList } from "../../../Redux/bookListSlice";
import { LinkNameListProps } from '../../../Types/types';
import styles from './index.module.css';

const ThumbNailList = ({ linkName, imageListProp, pageChanged }: LinkNameListProps) => {
    const dispatch = useAppDispatch();
    const handleLinkClick = () => {
        if(linkName !== 'Favorites') {
            dispatch(setBookList(imageListProp));
            pageChanged && pageChanged(true);
        }
    }
    return (
        <><Link
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
            } }>
            {linkName}
        </Link>
        {imageListProp.length && <ImageList cols={3} gap={30} sx={{ m: '0px', height: '204px' }}>
                {imageListProp?.map((item) => (
                    <ImageListItem key={item.primary_isbn13}>
                        <img
                            className={styles.ImgEle}
                            src={item.book_image}
                            alt={item.title}
                            loading="lazy" />
                    </ImageListItem>
                ))}
            </ImageList>}</>
    );
}

export default ThumbNailList;