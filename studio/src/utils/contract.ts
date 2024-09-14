// utils/contract.js

import { useWriteContract, useWalletClient, useChainId } from 'wagmi'
import { abi } from '../lib/abi' // Adjust the path to your ABI file
import { bytecode } from '../lib/bytecode'
import { createPublicClient, http, Hex } from 'viem'
import { base } from 'viem/chains'

const contractAddress = '0xcA1DE631D9Cb2e64C863BF50b83D18249dFb7054'
