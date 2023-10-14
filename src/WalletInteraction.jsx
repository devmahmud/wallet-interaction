import { prepareWriteContract, waitForTransaction, writeContract, readContract } from '@wagmi/core';
import testABI from './abi/testABI.json';
import { useAccount } from 'wagmi';

const testABIAddress = '0xE5F537Bc26856B3E5080fd701527E67B80dc3215';

const WalletInteraction = () => {
  const { address } = useAccount();

  const fetchData = async () => {
    const data = await readContract({
      abi: testABI,
      address: testABIAddress,
      functionName: 'greet',
    });
    console.log(data);
  };

  const writeData = async () => {
    const { request } = await prepareWriteContract({
      abi: testABI,
      address: testABIAddress,
      functionName: 'setGreeting',
      args: ['Hello, world!'],
      account: address,
    });

    const { hash } = await writeContract(request);
    await waitForTransaction({
      hash,
    });
    alert(`Transaction confirmed with hash ${hash}!`);
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={fetchData}>Fetch data</button>
      <button onClick={writeData}>Write data</button>
    </div>
  );
};

export default WalletInteraction;
