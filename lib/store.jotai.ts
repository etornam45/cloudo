import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { FileTypeI, FolderI, UserI } from './prisma';

export const logggedInUserAtom = atomWithStorage<UserI | null>("user" ,null);
export const fileTypesAtom = atom<FileTypeI[]>([]);

export const FoldersAtom = atomWithStorage<FolderI[]>("folders", []);

export const RecentFoldersAtom = atom<FolderI[]>((get) => {
    const folders = get(FoldersAtom);
    // Return first 5 folders
    return folders.slice(0, 5);  
})

export const openedRightSideBarAtom = atom<boolean>(true)