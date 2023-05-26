import _MisLayout from './ElmLayout';
import { withInstall, WithInstallType } from '../utils/withInstall';

export const MisLayout: WithInstallType<typeof _MisLayout> = withInstall(_MisLayout);
export default MisLayout;
