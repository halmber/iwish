import { View } from "react-native";
import { Text, Input } from "@/components/ui/";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl }) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2">URL</Text>
      <Input
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
        keyboardType="url"
      />
    </View>
  );
};

export default UrlInput;
