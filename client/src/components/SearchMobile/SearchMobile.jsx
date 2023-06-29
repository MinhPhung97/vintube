import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Content, Wrapper } from './SearchMobileStyled/SearchMobileStyled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchMobile({ handleSearchMobile }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleOnChangeInput = (e) => {
    setQuery(e.target.value);
  };

  const handleClearInput = () => {
    setQuery('');
  };
  return (
    <Wrapper>
      <ArrowBackIcon onClick={handleSearchMobile} />
      <Content>
        <input type="text" placeholder="Tìm kiếm" value={query} onChange={handleOnChangeInput} />
        {query === '' ? '' : <CloseIcon onClick={handleClearInput} />}
        <SearchIcon
          onClick={() => {
            navigate(`/search?q=${query}`);
          }}
        />
      </Content>
    </Wrapper>
  );
}

export default SearchMobile;
