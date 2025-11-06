import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export type ProductCardProps = {
  id: number;
  name: string;
  description?: string;
  price: number;
  thumbnail_url?: string;
  onPress?: (id: number) => void;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  thumbnail_url,
  onPress,
}: ProductCardProps) {
  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={{
        flexBasis: "48%",
        flexGrow: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <Image
        source={{ uri: thumbnail_url }}
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "#F9FAFB",
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 13, fontWeight: "700", color: "#111827" }}
        >
          {name}
        </Text>
        {description ? (
          <Text
            numberOfLines={2}
            style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}
          >
            {description}
          </Text>
        ) : null}
        <Text
          style={{
            marginTop: 4,
            color: "#2ec4b6",
            fontWeight: "800",
          }}
        >
          Rp {Number(price).toLocaleString("id-ID")}
        </Text>
      </View>
    </Pressable>
  );
}
