import Link from '@mui/material/Link';

type LinkNameProps = {
    linkName: string;
  }

const ThumbNailList = ({ linkName }: LinkNameProps) => {
    return (
        <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      {linkName}
    </Link>
  );
}

export default ThumbNailList;