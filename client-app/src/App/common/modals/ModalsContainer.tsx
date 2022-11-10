import { observer } from "mobx-react-lite";
import { Modal, ModalContent} from "semantic-ui-react";
import { UseStore } from "../../Containers/storeContainer"


export default observer(function ModalsContainer() {
    const { modalsStore } = UseStore();

    return (
        <Modal closeIcon size='mini' dimmer='blurring' open={modalsStore.modal.open} onClose={modalsStore.closeForm} >
            <ModalContent>
                {modalsStore.modal.content}
            </ModalContent>
        </Modal>
    )
})