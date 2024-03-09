import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArchiveIcon, DownloadIcon, FileTextIcon, ImageIcon, SpeakerLoudIcon, VideoIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

export default function OverviewStorage() {
    return <div className="flex gap-4 p-3">
        <FileTypesCard fileType="Documents" size_used={10} size_total={20} files={100} color="blue" icon={<FileTextIcon className="w-5 h-5" />} />
        <FileTypesCard fileType="Images" size_used={19} size_total={20} files={100} color="green" icon={<ImageIcon className="w-5 h-5" />} />
        <FileTypesCard fileType="Videos" size_used={10} size_total={20} files={100} color="red" icon={<VideoIcon className="w-5 h-5" />} />
        <FileTypesCard fileType="Audio" size_used={10} size_total={20} files={100} color="yellow" icon={<SpeakerLoudIcon className="w-5 h-5" />} />
        <FileTypesCard fileType="Others" size_used={10} size_total={20} files={100} color="purple" icon={<ArchiveIcon className="w-5 h-5" />} />

    </div>;
}

interface FileTypesCardProps {
    fileType: string;
    size_used: number;
    size_total: number;
    color: string;
    files: number;
    icon: ReactNode;
}

export const FileTypesCard = (file: FileTypesCardProps) => {
    return (<Card className="rounded-sm p-5 ">
            <div className="flex  flex-col min-w-[250px] gap-3">
                <div className="flex items-center gap-3">
                    <div className="icon w-12 aspect-square flex items-center justify-center bg-slate-500 rounded-sm" style={{backgroundColor: file.color}}>
                        {file.icon}
                    </div>
                    <div className="info">
                        <h2>{file.fileType}</h2>
                        <p>{file.files} files</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <Progress value={file.size_used} max={file.size_total} color={file.color} />
                    <p>{file.size_used} GB {file.size_total} GB</p>
                </div>
            </div>
    </Card>)
}