import { useState } from 'react';
import { Input } from './form';

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
          type="search"
          value=""
          onChange={() => {}}
          placeholder="Search items"
        />
      </div>

      <img
        onClick={() => {
          setShow(!show);
        }}
        src="/images/search.svg"
        alt="Search Icon"
        width={35}
        height={35}
        className="cursor-pointer"
      />
    </>
  );
}
