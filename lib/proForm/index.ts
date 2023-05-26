import _ElmProForm from './ElmProForm';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { ProFormProps } from './type';

export * from './type';
export type ElmProFormProps = ProFormProps;

export const ElmProForm: WithInstallType<typeof _ElmProForm> = withInstall(_ElmProForm);
export default ElmProForm;
