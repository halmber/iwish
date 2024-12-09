import { Text, Input } from "@/components/ui/";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

interface PriceInputsProps {
  price: string;
  setPrice: (price: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

const PriceInputs: React.FC<PriceInputsProps> = ({
  price,
  setPrice,
  currency,
  setCurrency,
}) => {
  const currencyOptions = ["UAH", "USD", "EUR", "GBP"];

  return (
    <View className="mb-4 flex-row justify-between">
      <View className="w-1/3">
        <Text className="text-base font-medium mb-2">Price</Text>
        <Input
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          maxLength={10}
          style={{ height: 50, fontSize: 18 }}
        />
      </View>

      <View className="w-[35%] ml-4">
        <Text className="text-base font-medium mb-2">Currency</Text>
        <Picker
          itemStyle={{ color: "white", backgroundColor: "#09090b" }}
          selectedValue={currency}
          onValueChange={(itemValue) => setCurrency(itemValue)}
          mode="dropdown"
          style={{
            color: "white",
            backgroundColor: "#09090b",
          }}
          dropdownIconColor="white"
        >
          {currencyOptions.map((cur) => (
            <Picker.Item
              key={cur}
              label={cur}
              value={cur}
              style={{
                color: "white",
                backgroundColor: "#09090b",
              }}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default PriceInputs;
