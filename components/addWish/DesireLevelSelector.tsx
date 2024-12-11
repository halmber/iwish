import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface DesireLevelSelectorProps {
  desireLvl: number;
  setDesireLvl?: (desireLvl: number) => void;
}

const DesireLevelSelector: React.FC<DesireLevelSelectorProps> = ({
  desireLvl,
  setDesireLvl,
}) => {
  const desireLvls = [1, 2, 3, 4, 5];

  return (
    <View className="flex-row justify-between mb-4">
      <Text className="text-base font-medium mb-2">Desire Level</Text>
      <View className="flex-row gap-2">
        {desireLvls.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setDesireLvl && setDesireLvl(level)}
          >
            <FontAwesome
              name="heart"
              size={20}
              color={level <= desireLvl ? "red" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DesireLevelSelector;
