export type LinkNameListProps = {
    linkName: string;
    imageListProp: Array<ImageObjectProp> | [];
    pageChanged?: Function;
};

export type ImageObjectProp = {
    contributor: string;
    book_image: string,
    title: string,
    primary_isbn13: string;
    rank: string;
    price: string;
    isFavorite?: boolean;
}