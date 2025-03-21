export type TPartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type TRequiredBy<T, K extends keyof T> = T & { [P in K]-?: T[P] };
