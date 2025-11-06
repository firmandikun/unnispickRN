// src/components/AppHeader.tsx
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";

type TabKey = "Event" | "Feed" | "Subscription" | "Recycle";

export default function AppHeader({
  active = "Event",
  onTabChange,
  onBell,
  onCart,
  onSearch,
  placeholder = "Search product..",
}: {
  active?: TabKey;
  onTabChange?: (t: TabKey) => void;
  onBell?: () => void;
  onCart?: () => void;
  onSearch?: (text: string) => void;
  placeholder?: string;
}) {
  const tabs: TabKey[] = ["Event", "Feed", "Subscription", "Recycle"];

  const animX = useRef(new Animated.Value(0)).current;
  const tabIndex = Math.max(0, tabs.indexOf(active));
  useEffect(() => {
    Animated.timing(animX, {
      toValue: tabIndex,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [tabIndex]);

  const underlineTranslate = animX.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["-187.5%", "-62.5%", "62.5%", "187.5%"], 
  });

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: Platform.OS === "ios" ? 8 : 12,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View style={{ paddingRight: 2 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              letterSpacing: 0.5,
              color: "#2ec4b6",
            }}
          >
            UNNIS
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            height: 40,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            backgroundColor: "#fff",
          }}
        >
          <SvgXml xml={SEARCH_ICON} width={18} height={18} opacity={0.6} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            onChangeText={onSearch}
            style={{
              flex: 1,
              marginLeft: 8,
              padding: 0,
              color: "#111827",
              fontSize: 14,
            }}
            returnKeyType="search"
          />
        </View>
        <Pressable onPress={onBell} hitSlop={10} style={{ paddingHorizontal: 2 }}>
          <SvgXml xml={BELL_ICON} width={28} height={28} />
        </Pressable>
        <Pressable onPress={onCart} hitSlop={10} style={{ paddingLeft: 2 }}>
          <SvgXml xml={CART_ICON} width={30} height={30} />
        </Pressable>
      </View>

      <View style={{ borderTopWidth: 1, borderColor: "#F3F4F6" }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: 8,
            justifyContent: "space-between",
          }}
        >
          {tabs.map((t) => {
            const isActive = t === active;
            return (
              <Pressable
                key={t}
                onPress={() => onTabChange?.(t)}
                style={{ flex: 1, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? "800" : "600",
                    color: isActive ? "#111827" : "#6B7280",
                  }}
                >
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#E5E7EB",
          opacity: 0.5,
        }}
      />
    </View>
  );
}


const SEARCH_ICON = `
<svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="7"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>
`;

const BELL_ICON = `
<svg viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 17H9a7 7 0 0 1-2.31-5.22V11a5.31 5.31 0 1 1 10.62 0v.78A7 7 0 0 1 15 17Z"/>
  <path d="M9.5 17a2.5 2.5 0 0 0 5 0"/>
</svg>
`;

const CART_ICON = `
<svg viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="20" r="1.5"/>
  <circle cx="17" cy="20" r="1.5"/>
  <path d="M3 3h2l1.6 9.59A2 2 0 0 0 8.6 14h7.9a2 2 0 0 0 2-1.64L20 8H6"/>
</svg>
`;
