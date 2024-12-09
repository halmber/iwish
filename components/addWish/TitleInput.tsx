import { View } from "react-native";
import { Text, Input } from "@/components/ui/";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <View className="mb-4">
      <Text className="text-base font-medium mb-2">Title</Text>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
    </View>
  );
};

export default TitleInput;
