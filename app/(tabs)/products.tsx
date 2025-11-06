import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function Products() {
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = useProducts(page, 5);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderColor: "#F3F4F6",
          marginTop: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
          Daftar Produk
        </Text>
      </View>

      <FlatList
        data={data?.data ?? []}
        keyExtractor={(it) => String(it.id)}
        numColumns={2}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 80 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            thumbnail_url={item.thumbnail_url}
            onPress={(id) => router.push(`/product/${id}`)}
          />
        )}
        ListFooterComponent={
          data ? (
            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
              <Pagination
                page={data.meta.current_page}
                lastPage={data.meta.last_page}
                onChange={setPage}
              />
            </View>
          ) : null
        }
      />
      {isFetching ? (
        <Text style={{ textAlign: "center", padding: 8, color: "#6B7280" }}>
          Memuat…
        </Text>
      ) : null}
    </View>
  );
}
