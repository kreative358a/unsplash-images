import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchTerm, setSearchPage } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements);
    // console.log(e.target.elements.search.value);
    const searchValue = e.target.elements.search.value;
    const searchPageNumber = e.target.elements.pageNumber.value;
    if (!searchValue) return;
    // console.log(searchValue)
    setSearchTerm(searchValue);
    setSearchPage(parseInt(searchPageNumber));
  };
  return (
    <section>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="inputs-inline">
          <input
            type="text"
            className="form-input search-input-text"
            name="search"
            placeholder="cat"
          />
          <input
            type="number"
            className="form-input search-input-number"
            name="pageNumber"
            min={1}
            max={10}
            defaultValue={1}
          />
        </div>
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;
