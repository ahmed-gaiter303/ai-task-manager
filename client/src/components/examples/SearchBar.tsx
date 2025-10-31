import SearchBar from '../SearchBar';
import { useState } from 'react';

export default function SearchBarExample() {
  const [search, setSearch] = useState('');
  
  return <SearchBar value={search} onChange={setSearch} />;
}
