// app/product/[id].tsx
import { useProduct } from "@/hooks/useProducts";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data: p, isLoading, isError } = useProduct(id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          title: p?.name ?? "Detail Produk",
        }}
      />

      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : isError || !p ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
          <Text>Gagal memuat detail produk.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <Image
            source={{ uri: p.thumbnail_url }}
            style={{ width: "100%", height: 280, backgroundColor: "#F3F4F6" }}
            resizeMode="cover"
          />

          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            {p.brand ? (
              <Text style={{ color: "#6B7280", fontWeight: "600" }}>{p.brand.name}</Text>
            ) : null}
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#111827", marginTop: 2 }}>
              {p.name}
            </Text>
            <Text style={{ marginTop: 6, color: "#10b981", fontWeight: "800", fontSize: 18 }}>
              Rp {Number(p.price).toLocaleString("id-ID")}
            </Text>
          </View>

          {p.description ? (
            <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
              <Text style={{ color: "#374151", lineHeight: 20 }}>{p.description}</Text>
            </View>
          ) : null}

          {p.detail ? (
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <Text style={{ fontWeight: "700", color: "#111827", marginBottom: 8 }}>Detail</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Row label="SKU" value={p.detail.sku} />
                <Row label="Stok" value={String(p.detail.stock)} divider />
                {p.detail.specs
                  ? Object.entries(p.detail.specs).map(([k, v], i, arr) => (
                      <Row
                        key={k}
                        label={toTitle(k)}
                        value={String(v)}
                        divider={i < arr.length - 1}
                      />
                    ))
                  : null}
              </View>
            </View>
          ) : null}

          <View style={{ paddingHorizontal: 16, marginTop: 18, gap: 10 }}>
            <Pressable
              onPress={() => console.log("add to cart", p.id)}
              style={{
                height: 48,
                borderRadius: 12,
                backgroundColor: "#2ec4b6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "800" }}>Tambah ke Keranjang</Text>
            </Pressable>
            <Pressable
              onPress={() => console.log("buy now", p.id)}
              style={{
                height: 48,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#2ec4b6",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#2ec4b6", fontWeight: "800" }}>Beli Sekarang</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Row({ label, value, divider }: { label: string; value?: string; divider?: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: divider ? 1 : 0,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <Text style={{ color: "#6B7280" }}>{label}</Text>
      <Text style={{ color: "#111827", fontWeight: "600", maxWidth: "55%", textAlign: "right" }}>
        {value || "-"}
      </Text>
    </View>
  );
}

function toTitle(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
