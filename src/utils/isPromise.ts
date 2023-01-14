export default function isPromise<TData = unknown>(
  value: any,
): value is Promise<TData> {
  return !!value?.then;
}
