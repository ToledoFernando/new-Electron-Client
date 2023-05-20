import "./DownloadPage.scss";
import SearchForm from "../../components/SearchDownloads/SearchForm";
import SearchResult from "../../components/SearchResult/SearchResult";

function DownloadPage() {
  return (
    <div className="download-page">
      <br />
      <SearchForm />
      <SearchResult />
    </div>
  );
}

export default DownloadPage;
