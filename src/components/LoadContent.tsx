import type { ComponentProps, ReactNode } from 'react';
import { MdDownloading } from 'react-icons/md';

export type LoadContentProps = {
  isLoading: boolean;
  children: ReactNode;
  loaderContainerProps?: ComponentProps<'div'>;
};

export default function LoadContent({
  isLoading,
  children,
  loaderContainerProps,
}: LoadContentProps) {
  if (isLoading)
    return (
      <div
        {...loaderContainerProps}
        className={`flex justify-center ${
          loaderContainerProps?.className ?? ''
        }`}
      >
        <MdDownloading
          className="w-10 h-10 animate-bounce text-slate-400/50"
          aria-hidden="true"
        />
      </div>
    );

  return <>{children}</>;
}
