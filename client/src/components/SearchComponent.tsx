import { useState } from 'react';
import { Input } from './form';
import { SearchIcon } from './icons';

export default function SearchComponent() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={`mt-5 -mr-1 transition-all duration-500 ease-linear overflow-hidden ${
          show ? 'w-64' : 'w-0'
        }`}
      >
        <Input
          id="header-search-bar-component"
          name="header-search-bar-component"
          type="search"
          value=""
          onChange={() => {}}
          placeholder="Search items"
        />
      </div>

      <div
        className="cursor-pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <SearchIcon size={35} />
      </div>
    </>
  );
}
