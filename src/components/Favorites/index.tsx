import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from '@mui/material/Button';
import BookBestSellersList from "../../Common/BookBestSellersList";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { updatePriceRating } from '../../Redux/bookListSlice';
import styles from './index.module.css';
import { ImageObjectProp } from "../../Types/types";
import { BackArrowFav } from "../../Assets/NavigationIcons";


type PageProps = {
  pageName: string;
}

const FavoritePage = ({ pageName }: PageProps) => {
  const favBookList = useAppSelector(state => state.booListStore.bookFavoriteList);
  const dispatch = useAppDispatch();
  const [editItem, setEditItem] = useState<ImageObjectProp>();
  const [priceVal, setPriceVal] = useState<string>('');
  const [rankVal, setRankVal] = useState<number>(0);
  const [isEditPage, setIsEditPage] = useState<boolean>(false);
  useEffect(() => {
    if (editItem) {
      setPriceVal(editItem?.price);
      setRankVal(editItem?.rank);
      setIsEditPage(true);
    }
  }, [editItem]);
  const handleUpdatePriceRank = () => {
    editItem && priceVal && rankVal && dispatch(updatePriceRating({
      item: editItem,
      price: priceVal.toString(),
      rating: rankVal
    }));
  };
  return (
    isEditPage && editItem && Object.keys(editItem).length ?
      <div className={styles.EditWrapper}>
        <div className={styles.ImageTitleWrapper}>
          <img src={editItem.book_image} alt="BookImage" />
          <div className={styles.titleClass}>
            <span>{editItem.title}</span>
            <span className={styles.Author}>{editItem.contributor}</span>
          </div>
        </div>
        <div>
          <span className={styles.EditTitleWrapper}>Edit</span>
          <div className={styles.InputClass}>
            <span>Cost</span>
            <input
              value={priceVal}
              onChange={(e) => e.target.value && setPriceVal(e.target.value)}
              type="number"
            />
          </div>
          <div className={styles.InputClass}>
            <span>Rating</span>
            <Rating
              name="book rank"
              precision={1}
              value={rankVal}
              onChange={(e, value) => value && setRankVal(value)}
              sx={{ margin: '8px 16px', alignItems: 'center' }}
              size="small" />
          </div>
          <Button variant="contained" sx={{
            background: 'linear-gradient(180deg, #679CF6 0%, #4072EE 100%)',
            width: '218px', height: '52px', borderRadius: '41px'
          }} onClick={() => handleUpdatePriceRank()}>Update</Button>
        </div>
        <div className={styles.BackArrowEnd}>
        <IconButton onClick={() => { setIsEditPage(false) }} aria-label="back-arrow" sx={{ width: '24px', height: '24px', p: '0px', mr: '15px' }}>
            <BackArrowFav />
        </IconButton>
        <span style={{ fontSize: '20px', color: '#454664', fontWeight: '400'}}>Return to:</span>
        <Link href="#" sx={{ ml: '8px', fontSize: '20px', fontWeight: '700', color: '#93B4BC'}} variant="body2">Favorites</Link>
        </div>
      </div> :
      <div className={styles.Wrapper}>
        <BookBestSellersList title={pageName} list={favBookList} setEditItem={setEditItem} />
      </div>)
};

export default FavoritePage;