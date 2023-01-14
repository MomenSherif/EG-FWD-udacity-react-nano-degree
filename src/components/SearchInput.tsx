import { ComponentProps } from 'react';

export type SearchInputProps = ComponentProps<'input'>;

export default function SearchInput({
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <input
      type="search"
      className={`w-full mt-8 px-3 py-2 rounded focus:outline-none border border-slate-700 focus:border-slate-50/20 focus:ring focus:ring-slate-300/20 ${className}`}
      placeholder="Search..."
      {...props}
    />
  );
}
