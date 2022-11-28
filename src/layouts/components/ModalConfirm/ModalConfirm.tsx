import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
const ModalConfirm = ({ title = 'Xác nhận', children, handleConfirm }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef: any = useRef();
    return (
        <div>
            <span onClick={onOpen}>{children}</span>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Bạn có chắc chắn không? Bạn không thể hoàn tác hành động này sau đó..
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Hủy
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleConfirm();
                                    onClose();
                                }}
                                ml={3}
                            >
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
};

export default ModalConfirm;
