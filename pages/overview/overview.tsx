//  - Overview page for the application
import { FileTypeI } from '@/lib/prisma';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { fileTypesAtom } from '@/lib/store.jotai';
import OverviewStorage from './OverviewStorage';
import Folders from './Folders';
import MainDropZone from './MainDropZone';

export default function Overiew() {

    

    return (
        <div>
            <MainDropZone   />
            <h2 className='p-4 py-1 font-bold'>Storage Overview</h2>
            <OverviewStorage />
            <h2 className='p-4 font-bold'>Recent Folders</h2>
            <Folders />
            <h2 className='p-4 font-bold'>Recent Files</h2>
        </div>
    )
}