import { View } from "react-native";
import { Text, Input } from "@/components/ui/";

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  setDescription,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2">Description</Text>
      <Input
        placeholder="Write about your wish"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          height: 100,
          textAlignVertical: "top",
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default DescriptionInput;
