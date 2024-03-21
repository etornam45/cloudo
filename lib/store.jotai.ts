import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserI } from './prisma';

export const logggedInUserAtom = atomWithStorage<UserI | null>("user" ,null);