import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/";
import { View } from "react-native";

interface GiftDateSelectorProps {
  desiredGiftDate: Date;
  setDesiredGiftDate: (date: Date) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
}

const GiftDateSelector: React.FC<GiftDateSelectorProps> = ({
  desiredGiftDate,
  setDesiredGiftDate,
  showDatePicker,
  setShowDatePicker,
}) => {
  const pickDate = (_event: DateTimePickerEvent, date?: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      setDesiredGiftDate(date);
    }
  };

  return (
    <View className="mb-4 flex-row justify-between">
      <Text className="text-base font-medium mb-2">Desired Gift Date</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text className="text-xl text-[#ff6347]">
          {desiredGiftDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={desiredGiftDate}
          mode="date"
          display="default"
          onChange={pickDate}
        />
      )}
    </View>
  );
};

export default GiftDateSelector;
