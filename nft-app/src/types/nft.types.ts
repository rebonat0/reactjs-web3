export interface Nft {
    balance: string,
    contract: {
        address: string,
    },
    id: {
        tokenId: string,
        tokenMetadata: {
            tokenType: string,
        },
    }
    title: string,
    description: string,
    timeLastUpdated: string,
}