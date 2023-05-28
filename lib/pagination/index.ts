import { withInstall, WithInstallType } from '../utils/withInstall';
import _ElmPagination from './ElmPagination';
import { PaginationProps } from './type';

export * from './type';
export type ElmPaginationProps = PaginationProps;

export const ElmPagination: WithInstallType<typeof _ElmPagination> = withInstall(_ElmPagination);
export default ElmPagination;
