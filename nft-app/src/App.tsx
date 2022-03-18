import { useState } from 'react';
import { ChakraProvider, Text, useDisclosure, Input, InputGroup, InputRightElement, Button, Alert } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import { useEthers } from "@usedapp/core";
import { useVerification } from './hooks/useVerification';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nftAddress, setNftAddress] = useState('');
  const { account } = useEthers();
  const { loading, haveAccess, handleVerify } = useVerification();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Text color={'white'} mb={5}>
          {account ? '' : 'Select your wallet to authenticate by pressing the button bellow.'}
        </Text>
        <ConnectButton handleOpenModal={onOpen} />
        {(account && haveAccess) && (
          <Text color={'white'} mt={5}>
            congrats! you've logged in to this page using an NFT
          </Text>
        )}

        {account && !haveAccess && 
          <InputGroup size='md' mt={5}>
            <Input
              type={'text'}
              textColor="white"
              value={nftAddress} 
              onChange={e => setNftAddress(e.currentTarget.value)}
              placeholder="Enter your NFT contract address to verify if you have permission to continue"
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' isLoading={loading} onClick={async () => await handleVerify(nftAddress)}>
                Verify
              </Button>
            </InputRightElement>
          </InputGroup>
        }
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
