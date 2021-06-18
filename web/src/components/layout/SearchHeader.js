import React from 'react';

const searchKeyword = [
  { label: '스포츠', code: 'sports' },
  { label: '면접룩', code: 'meet' },
  { label: '피크닉', code: 'pick' },
  { label: '스커트', code: 'scot' },
  { label: '데일리룩', code: 'daily' },
];
const SearchHeader = ({ searchStatus, setSearchStatus }) => {
  return (
    <div className={`serch-header ${searchStatus ? 'active' : ''}`}>
      <div className="inner">
        <div className="mb32">
          <input type="text" className="input-type-header" />
        </div>

        <div className="mb17 tc">
          <h5 className="small color-white">방금 전 이런 키워드를 검색했어요!</h5>
        </div>
        <div className="serch-wold-container">
          {searchKeyword.map((item) => {
            return (
              <div key={item.code} className="search-wold-item">
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
