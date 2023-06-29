import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Input, SearchContent, SearchIcons, Wrapper } from './SearchStyle/SearchStyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleOnChangeInput = (e) => {
    setQuery(e.target.value);
  };

  const handleClearInput = () => {
    setQuery('');
  };

  return (
    <>
      <Wrapper>
        <SearchContent>
          <Input placeholder="Search" value={query} onChange={handleOnChangeInput} />
          {query === '' ? '' : <CloseIcon onClick={handleClearInput} />}
        </SearchContent>
        <SearchIcons>
          <SearchIcon
            onClick={() => {
              navigate(`/search?q=${query}`);
            }}
          />
        </SearchIcons>
      </Wrapper>
    </>
  );
}

export default Search;
