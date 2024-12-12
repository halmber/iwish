import { Modal, View } from "react-native";
import { Button, Text } from "@/components/ui/";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Ok",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[75%] bg-[#1e1f35] rounded-lg p-6 shadow-lg shadow-white">
          <Text className="text-xl font-bold mb-4">{title}</Text>

          <Text className="text-lg mb-6">{message}</Text>

          <View className="flex-row justify-end gap-6">
            <Button variant="ghost" onPress={onClose} size={"sm"}>
              <Text>{cancelText}</Text>
            </Button>
            <Button
              variant={confirmText === "Delete" ? "destructive" : "default"}
              onPress={onConfirm}
              size={"sm"}
            >
              <Text>{confirmText}</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
