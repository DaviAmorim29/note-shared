export type Replace<T, K extends keyof T, TNew> = Omit<T, K> & { [P in K]: TNew };
