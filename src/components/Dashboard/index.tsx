import SearchInput from "../../Common/SearchInput";


type PageProps = {
  pageName: string;
}

const DashboardPage = ({ pageName }: PageProps) => (
  <SearchInput />
);

export default DashboardPage;