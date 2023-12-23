import {
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonPage,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import { ChainId, SUPPORTED_CHAINS } from '@uniswap/sdk-core';
import { CHAIN_IDS_TO_NAMES } from '../constants/chains';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
	const [activeChainId, setActiveChainId] = useState<ChainId>(
		SUPPORTED_CHAINS[1],
	);
	const [positionIds, setPositionIds] = useState<number[]>([]);

	useEffect(() => {}, [activeChainId]);

	async function getPositionIds(): Promise<number[]> {
		const provider = getProvider();
		const address = getWalletAddress();

		if (!provider || !address) {
			throw new Error('No provider available');
		}

		const positionContract = new ethers.Contract(
			NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
			NONFUNGIBLE_POSITION_MANAGER_ABI,
			provider,
		);

		// Get number of positions
		const balance: number = await positionContract.balanceOf(address);

		// Get all positions
		const tokenIds = [];
		for (let i = 0; i < balance; i++) {
			const tokenOfOwnerByIndex: number =
				await positionContract.tokenOfOwnerByIndex(address, i);
			tokenIds.push(tokenOfOwnerByIndex);
		}

		return tokenIds;
	}

	/**
	 * - Position ID
	 * - LOWER tick
	 * - UPPER tick
	 * - Current price
	 * - Liquidity
	 * - Uncollected fees
	 * - Collected fees
	 * -
	 */

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Home</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Home</IonTitle>
					</IonToolbar>
				</IonHeader>

				{/* Chain selector */}
				<IonSelect
					aria-label="Fruit"
					interface="action-sheet"
					placeholder="Select fruit"
				>
					{SUPPORTED_CHAINS.map((chainId) => {
						return (
							<IonSelectOption key={chainId} value={chainId}>
								{CHAIN_IDS_TO_NAMES[chainId]}
							</IonSelectOption>
						);
					})}
				</IonSelect>

				{/* Position IDs */}
				<IonListHeader className="ion-list-header-small">
					<IonLabel>Position IDs ({positionIds.length})</IonLabel>
				</IonListHeader>

				<IonList className="list-custom" lines="full">
					{positionIds.map((positionId: any, index: number) => {
						return (
							<IonItem
								key={index}
								button
								detail
								//
							>
								<IonLabel>{positionId}</IonLabel>
							</IonItem>
						);
					})}
				</IonList>

				{/*  */}
			</IonContent>
		</IonPage>
	);
};

export default Home;
