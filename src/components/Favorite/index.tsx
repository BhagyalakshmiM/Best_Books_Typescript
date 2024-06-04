import { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import BookBestSellersList from "../../Common/BookBestSellersList";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { updatePriceRating } from '../../Redux/bookListSlice';
import styles from './index.module.css';
import { ImageObjectProp } from "../../Types/types";


type PageProps = {
  pageName: string;
}

const FavoritePage = ({ pageName }: PageProps) => {
  const favBookList = useAppSelector(state => state.booListStore.bookFavoriteList);
  const dispatch = useAppDispatch();
  const [editItem, setEditItem] = useState<ImageObjectProp>();
  const [priceVal, setPriceVal] = useState<string>('');
  const [rankVal, setRankVal] = useState<number>(0);
  useEffect(() => {
    if(editItem) {
      setPriceVal(editItem?.price);
      setRankVal(editItem?.rank);
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
    editItem && Object.keys(editItem).length ?
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
              size="small"/>
          </div>
          <Button variant="contained" sx={{ background: 'linear-gradient(180deg, #679CF6 0%, #4072EE 100%)', 
          width: '218px', height: '52px', borderRadius: '41px' }} onClick={() => handleUpdatePriceRank()}>Update</Button>
        </div>
      </div> :
      <div className={styles.Wrapper}>
        <BookBestSellersList title={pageName} list={favBookList} setEditItem={setEditItem} />
      </div>)
};

export default FavoritePage;