import AppHeader from "@/components/AppHeader";
import BannerAutoFade from "@/components/BannerAutoFade";
import BrandChip from "@/components/BrandChip";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { useBrands } from "@/hooks/useBrands";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [activeBrandId, setActiveBrandId] = useState<number | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [tab, setTab] =
    useState<"Event" | "Feed" | "Subscription" | "Recycle">("Event");

  const { data: brandResp, isLoading: brandLoading } = useBrands(1, 10);
  const {
    data: productResp,
    isLoading: productLoading,
    isFetching,
  } = useProducts(page, 5, activeBrandId);

  const brands = brandResp?.data ?? [];
  const products = productResp?.data ?? [];
  const meta =
    productResp?.meta ?? ({ current_page: 1, last_page: 1 } as const);

  const header = useMemo(
    () => (
      <>
        <BannerAutoFade />

        <View style={{ marginTop: 12 }}>
          {brandLoading ? (
            <View style={{ paddingVertical: 12 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <BrandChip
                  brand={{ id: 0, name: "Semua" }}
                  active={activeBrandId === undefined}
                  onPress={() => {
                    setActiveBrandId(undefined);
                    setPage(1);
                  }}
                />
                {brands.map((b) => (
                  <BrandChip
                    key={b.id}
                    brand={b}
                    active={activeBrandId === b.id}
                    onPress={() => {
                      setActiveBrandId(b.id);
                      setPage(1);
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        <View style={{ marginVertical: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
            {activeBrandId ? "Produk berdasarkan brand" : "Rekomendasi"}
          </Text>
          <Text style={{ color: "#6B7280", marginTop: 2 }}>
            Serum, lip cream, night cream favorit — semua di sini.
          </Text>
        </View>
      </>
    ),
    [brandLoading, brands, activeBrandId]
  );

  const renderItem = ({ item }: ListRenderItemInfo<(typeof products)[number]>) => (
    <ProductCard
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      thumbnail_url={item.thumbnail_url}
      onPress={(id) => router.push(`/product/${id}`)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader
        active={tab}
        onTabChange={setTab}
        onBell={() => {}}
        onCart={() => {}}
        onSearch={() => {}}
      />

      <FlatList
        data={products}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
        columnWrapperStyle={{ justifyContent: "space-between" , gap: 12 }} 
        ListHeaderComponent={header}
        ListEmptyComponent={
          productLoading ? (
            <View style={{ paddingVertical: 24 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <Text style={{ color: "#6B7280", paddingHorizontal: 16, marginTop: 12 }}>
              Belum ada produk.
            </Text>
          )
        }
        ListFooterComponent={
          products.length ? (
            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
              <Pagination
                page={Number(meta.current_page) || 1}
                lastPage={Number(meta.last_page) || 1}
                onChange={setPage}
              />
              {isFetching ? (
                <Text
                  style={{ textAlign: "center", marginTop: 6, color: "#6B7280" }}
                >
                  Memuat…
                </Text>
              ) : null}
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
