'use client';
import { useEffect, useState } from 'react';
import { useAccount, useEnsAddress, useEnsAvatar, useEnsName, useReadContract } from 'wagmi';
import ConnectButton from '@/components/ConnectButton';
import useToast from '@/hooks/useToast';
import Link from 'next/link';
import { sepolia } from 'viem/chains';
import { useDispatch, useSelector } from 'react-redux';

export default function Home({ address }: { address: string }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const ensName = useEnsName({
    address: address,
    chainId: sepolia.id,
  });

  const { data: isBan } = useReadContract({
    chainId: sepolia.id,
    address: `0x${process.env.NEXT_PUBLIC_DAO_CONTRACT}`,
    functionName: 'bannedAccount',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'bannedAccount',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [`0x${ address !== undefined ? address.substring(2, 42) : '000'}`],
  });

  return (
    <main className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#9346FB] to-[#512CB7] text-white">
      <div className="w-[30%] justify-center items-center flex flex-col bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className=" h-[20%]">
          <img src="./images/BlueSe_logo.png" alt="" />
        </div>
        <div className=" w-full py-2 flex flex-col gap-5 items-center">
          <ConnectButton />
          {address !== undefined ? (
            <>
              {isBan ? (
                <p className=" p-2 font-semibold text-white rounded-xl bg-gray-400 cursor-not-allowed">Account is banned</p>
              ) : (
                <a
                  href={`/logIn/${address}&${ensName.data}`}
                  className=" w-[50%] font-semibold text-center p-2 bg-blue-500 hover:bg-red-300 text-white rounded-xl"
                >
                  Next
                </a>
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  );
}
