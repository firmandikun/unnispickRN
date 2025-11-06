import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Brand } from "../api/types";

export default function BrandChip({ brand, active, onPress }:{
  brand: Brand; active?: boolean; onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row", alignItems: "center", gap: 6,
        paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999,
        borderWidth: 1, borderColor: active ? "#2ec4b6" : "#E5E7EB",
        backgroundColor: active ? "#2ec4b6" : "#fff", marginRight: 8,
      }}
    >
      <View style={{ width: 24, height: 24, borderRadius: 12, overflow: "hidden", backgroundColor: "#F3F4F6" }}>
        {!!brand.logo_url && <Image source={{ uri: brand.logo_url }} style={{ width: "100%", height: "100%" }} />}
      </View>
      <Text numberOfLines={1} style={{ maxWidth: 120, fontSize: 13, fontWeight: "700", color: active ? "#fff" : "#111827" }}>
        {brand.name}
      </Text>
    </Pressable>
  );
}
