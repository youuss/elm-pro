import _ElmProTable from './ElmProTable';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { ProTableProps, DefaultRow } from './type';

export * from './type';
export type ElmProTableProps = ProTableProps<DefaultRow>;

export const ElmProTable: WithInstallType<typeof _ElmProTable> = withInstall(_ElmProTable);
export default ElmProTable;
