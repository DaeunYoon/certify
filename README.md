## Certify

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Environment Variables
- ARBITRUM_SEPOLIA_RPC_URL
- BASE_SEPOLIA_RPC_URL
- SEPOLIA_RPC_URL
- ARBITRUM_SEPOLIA_BLOCKSCOUT_URL
- BASE_SEPOLIA_BLOCKSCOUT_URL
- SEPOLIA_BLOCKSCOUT_URL
- PRIVATE_KEY: (optional) required to deploy contracts

In case you want to use env variables in current location please run following command after creating `.env` file
```shell
source .env
```

### Deploy

```shell
$ forge script script/Deploy.s.sol:DeployScript --fork-url <CHAIN_TO_DEPLOY> 
```

:note: The above code only simulate deploy. If you want to actually broadcast the transactions and verify contracts please add `--verifier blockscout --verifier_url "${CHAIN_BLOCKSCOUT_URL}/api?" --verify --broadcast`

eg. deploy on sepolia
```shell
forge script script/Deploy.s.sol:DeployScript --fork-url sepolia --verifier blockscout --verifier-url "${SEPOLIA_BLOCKSCOUT_URL}/api?" --verify --broadcast
```
