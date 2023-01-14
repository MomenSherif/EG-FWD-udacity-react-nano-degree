import type { ReactNode } from 'react';

export type PageHeadingProps = {
  children: ReactNode;
};

export default function PageHeading({ children }: PageHeadingProps) {
  return (
    <h1 className="text-3xl font-bold text-center gradient-text sm:text-5xl lg:text-7xl">
      {children}
    </h1>
  );
}
