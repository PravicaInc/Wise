import { atom } from 'jotai';
import { TransactionPayload } from '@stacks/connect';

export const transactionRequestTokenPayloadState = atom<
  (TransactionPayload & { redirect_uri: string; metadata: any }) | undefined
>(undefined);
