import { Card, Text } from "@/components/ui/";
import { cn } from "@/lib/utils";

interface WishlistCardProps {
  wishlistName: string;
  wishlistType: "public" | "private";
  wishlistDescription: string;
  descriptionTextize: "text-sm" | "text-lg";
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  wishlistName,
  wishlistType,
  wishlistDescription,
  descriptionTextize,
}) => {
  return (
    <Card className="bg-[#27293d] p-4">
      <Text className="text-lg font-bold mb-1">{wishlistName}</Text>

      <Text className="text-sm font-medium text-gray-400 mb-4">
        {wishlistType === "public" ? "Public" : "Private"}
      </Text>

      <Text className={cn("text-lg text-gray-300", descriptionTextize)}>
        {wishlistDescription || "No description available."}
      </Text>
    </Card>
  );
};

export default WishlistCard;
