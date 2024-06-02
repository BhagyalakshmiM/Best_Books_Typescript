import Link from '@mui/material/Link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './index.module.css';

type LinkNameListProps = {
    linkName: string;
    imageListProp: Array<{
        book_image: string,
        title: string
    }> | [];
}

const ThumbNailList = ({ linkName, imageListProp }: LinkNameListProps) => {
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
            onClick={() => {
                console.info("I'm a button.");
            } }>
            {linkName}
        </Link>
        {imageListProp.length && <ImageList cols={3} gap={30} sx={{ m: '0px' }}>
                {imageListProp?.map((item) => (
                    <ImageListItem key={item.book_image}>
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