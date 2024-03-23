import { FileTypeI, FileTypes } from "@/lib/prisma";
import { fileTypesAtom } from "@/lib/store.jotai";
import { CopyIcon, FileIcon, ImageIcon, ReaderIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { ReactNode, useEffect } from "react";


export default function OverviewStorage() {

    const [fileTypes, setFileTypes] = useAtom<FileTypeI[]>(fileTypesAtom);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/filetype');
            const data = await response.json();
            setFileTypes(data);
            console.log(data);
        }
        fetchData();
    }, []);

    return (
        <div className="flex gap-4 p-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {fileTypes.map((fileType) => (
                <div key={fileType.id} className="flex gap-3 items-center p-1 flex-row bg-gray-100 rounded-md">
                    <div className="p-4 bg-green-400/20 rounded-sm">{FileTypeIcon[fileType.name]}</div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-semibold">{fileType.name}</h2>
                        <p>{fileType._count?.files} files</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


const FileTypeIcon: Record<FileTypes, ReactNode> = {
    "Documents": <ReaderIcon className="w-6 h-6" />,
    "Images": <ImageIcon className="w-6 h-6" />,
    "Audio": <SpeakerLoudIcon className="w-6 h-6" />,
    "Video": <FileIcon className="w-6 h-6" />,
    "Others": <CopyIcon className="w-6 h-6" />
}  