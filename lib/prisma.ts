import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient()


// Generated interfaces from Prisma schema

export interface UserI {
    id: string;
    username: string;
    email: string;
    password: string;
    folders?: FolderI[];
    files?: FileI[];
    sharedFolders?: SharedFolderI[];
    sharedFiles?: SharedFileI[];
    StoragePlan?: StoragePlanI | null;
    storagePlanId?: string | null;
}

export interface StoragePlanI {
    id: string;
    name: string;
    max_storage: bigint;
    price: number;
    users?: UserI[];
}

export interface FolderI {
    id: string;
    name: string;
    created_at: Date;
    owner_id: string;
    parent_id?: string | null;

    owner: UserI;
    files?: FileI[];
    SharedFolder?: SharedFolderI[];

    children?: FolderI | null;
    Folder: FolderI[];
}

export interface FileI {
    id: string;
    name: string;
    size_bytes: number;
    created_at: Date;
    type_id: string;
    owner_id: string;
    folder_id: string;

    owner: UserI;
    folder: FolderI;
    type: FileTypeI;
    sharedFiles?: SharedFileI[];
}

export interface FileTypeI {
    id: string;
    name: FileTypes;
    files?: FileI[];
    _count?: {
        files: number;
    }
}

export type FileTypes = "Documents" | "Images" | "Video" | "Audio" | "Others";

export interface SharedFolderI {
    id: string;
    folder_id: string;
    user_id: string;
    folder: FolderI;
    user: UserI;
}

export interface SharedFileI {
    id: string;
    file_id: string;
    user_id: string;
    file: FileI;
    user: UserI;
}
