import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { cn } from "@/lib/utils";

interface DesireLevelSelectorProps {
  desireLvl: number;
  setDesireLvl?: (desireLvl: number) => void;
  classname?: string;
}

const DesireLevelSelector: React.FC<DesireLevelSelectorProps> = ({
  desireLvl,
  setDesireLvl,
  classname,
}) => {
  const desireLvls = [1, 2, 3, 4, 5];

  return (
    <View className={cn("flex-row justify-between", classname)}>
      <View className="flex-row gap-2">
        {desireLvls.map((level) => (
          <TouchableOpacity
            activeOpacity={setDesireLvl ? 0.2 : 1}
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
