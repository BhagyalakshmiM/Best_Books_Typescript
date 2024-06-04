import BookBestSellersList from "../../Common/BookBestSellersList";
import { useAppSelector } from "../../Redux/hooks";
import styles from './index.module.css';


type PageProps = {
  pageName: string;
}

const FavoritePage = ({ pageName }: PageProps) => {
  const favBookList = useAppSelector(state => state.booListStore.bookFavoriteList);
  return (
<div className={styles.Wrapper}>
  <BookBestSellersList title={pageName} list={favBookList} />
  </div>)
};

export default FavoritePage;