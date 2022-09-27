import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import images from '~/assets/images';
import Image from '../Image';
const ModalConfirm = ({ children, handleDelete }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="modal-confirm flex">
                            <h3 className="text-2xl m-auto font-semibold text-red-500">Bạn có chắc muốn xóa không ?</h3>
                            <Image src={images.gifConfirmDelete} className="w-[40%] m-auto" alt="" />
                        </div>
                    </ModalBody>

                    <ModalFooter className="border-t">
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="twitter" onClick={handleDelete}>
                            Đồng ý
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModalConfirm;
