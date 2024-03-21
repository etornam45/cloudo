import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileTextIcon, ImageIcon, VideoIcon, SpeakerLoudIcon, ArchiveIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

export default function Folders() {
    return (
        <div className="flex gap-4 p-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <FolderCard folderName="Documents" files={100} color="blue" icon={<FileTextIcon className="w-5 h-5" />} />
            <FolderCard folderName="Images" files={100} color="green" icon={<ImageIcon className="w-5 h-5" />} />
            <FolderCard folderName="Videos" files={100} color="red" icon={<VideoIcon className="w-5 h-5" />} />
            <FolderCard folderName="Audio" files={100} color="yellow" icon={<SpeakerLoudIcon className="w-5 h-5" />} />
            <FolderCard folderName="Others" files={100} color="purple" icon={<ArchiveIcon className="w-5 h-5" />} />
        </div>
    );
}

interface FolderCardProps {
    folderName: string;
    color: string;
    files: number;
    icon: ReactNode;
}

const FolderCard = (folder: FolderCardProps) => {
    return (
        <div>
            <Card className="rounded-sm p-3 shadow-none hover:shadow-md" >
                <div className="flex  flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="icon w-12 aspect-square flex items-center justify-center bg-slate-500 rounded-sm" style={{ backgroundColor: `color-mix(in srgb, ${folder.color} 80%, white 70%)` }}>
                            {folder.icon}
                        </div>
                        <div className="info">
                            <h2 className="text-lg font-bold">{folder.folderName}</h2>
                            <p>{folder.files} files</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <Progress value={50} color={folder.color} />
                        <p className="mt-2">10 GB 20 GB</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}