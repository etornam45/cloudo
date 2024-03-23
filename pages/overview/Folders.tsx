import { FolderI } from "@/lib/prisma";
import { FoldersAtom, RecentFoldersAtom } from "@/lib/store.jotai";
import { useAtom } from "jotai";

export default function Folders() {
    const [folders, setFolders] = useAtom<FolderI[]>(FoldersAtom);
    const [recentFolders, setRecentFolders] = useAtom<FolderI[]>(RecentFoldersAtom);

    if (folders.length === 0) {
        fetch('/api/folder',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setFolders(data);
        })
        .catch((error) => {
            return (<>
                <h1>Error fetching folders</h1>
            </>)
        });
    }



    return (
        <div className="flex gap-4 p-3">
            {recentFolders.map((folder) => (
                <div key={folder.id} className="flex  items-start w-[200px] p-3 flex-col bg-gray-100 rounded-md hover:shadow cursor-pointer">
                    <div className="p-1 rounded-sm">📁</div>
                    <div className="flex flex-col pl-2">
                        <h2 className="font-semibold">{folder.name}</h2>
                        <p className="italic">{folder.files?.length} files</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
