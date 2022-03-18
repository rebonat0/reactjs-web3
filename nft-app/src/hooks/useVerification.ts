import { useEthers } from '@usedapp/core';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Nft } from '../types/nft.types';

export const useVerification = () => {
    const { account } = useEthers();
    const [loading, setLoading] = useState(false);
    const [haveAccess, setHaveAccess] = useState(false);
    
    const handleVerify = async (nftAddress: string) => {
        setLoading(true);
        const response = await axios.get<
            AxiosResponse,
            { data: { ownedNfts: Nft[] }}
        >
        (`https://eth-mainnet.alchemyapi.io/v2/ZZAGo43pnhwiFaE6TrbvPSSIOxJPRY5b/getNFTs?owner=${account}`);
        
        const { data } = response;

        const ntf = data?.ownedNfts?.find((on: any) => on?.contract?.address === nftAddress);

        setLoading(false);

        if (!ntf) {
            alert('No permission to see the page :c');
            setHaveAccess(false);
            return;
        }
        setHaveAccess(true);
    }

    return {
        loading,
        haveAccess,
        handleVerify,
    }
}