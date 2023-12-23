import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonModal,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { add } from 'ionicons/icons';
import { useRef } from 'react';

const Accounts: React.FC = () => {
	const accounts = ['0x0', '0x0'];

	const modal = useRef<HTMLIonModalElement>(null);
	const input = useRef<HTMLIonInputElement>(null);

	function confirm() {
		modal.current?.dismiss(input.current?.value, 'confirm');
	}

	function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
		if (ev.detail.role === 'confirm') {
			// setMessage(`Hello, ${ev.detail.data}!`);
		}
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Accounts</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Accounts</IonTitle>
						<IonButtons slot="primary">
							<IonButton id="open-modal" expand="block">
								<IonIcon slot="icon-only" icon={add}></IonIcon>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>

				<IonModal
					ref={modal}
					trigger="open-modal"
					onWillDismiss={(ev) => onWillDismiss(ev)}
				>
					<IonHeader>
						<IonToolbar>
							<IonButtons slot="start">
								<IonButton
									onClick={() => modal.current?.dismiss()}
								>
									Cancel
								</IonButton>
							</IonButtons>
							<IonTitle>Add account</IonTitle>
							<IonButtons slot="end">
								<IonButton
									strong={true}
									onClick={() => confirm()}
								>
									Confirm
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent className="ion-padding">
						<IonItem>
							<IonInput
								label="Enter an address"
								labelPlacement="stacked"
								ref={input}
								type="text"
								placeholder="Wallet address"
							/>
						</IonItem>
					</IonContent>
				</IonModal>

				<IonListHeader className="ion-list-header-small">
					<IonLabel>Accounts ({accounts.length})</IonLabel>
				</IonListHeader>

				<IonList className="list-custom" lines="full">
					{accounts.map((account: any, index: number) => {
						return (
							<IonItem
								key={index}
								button
								detail
								//
							>
								<IonLabel>{account}</IonLabel>
							</IonItem>
						);
					})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Accounts;
