import { Separator } from '@/components/ui/separator';
import StorageOverview from './OverviewStorage';
import Folders from './Folders';

export default function Overiew() {
    return (
        <div>
            <StorageOverview />
            <Separator />
            <Folders />
        </div>
    )
}