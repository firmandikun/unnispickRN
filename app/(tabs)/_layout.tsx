import { Tabs } from 'expo-router';
import React from 'react';
import { SvgUri } from 'react-native-svg';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const ICONS = {
  home: 'https://mobile.unnispick.com/assets/home-b4701a57.svg',
  products: 'https://mobile.unnispick.com/assets/products-f35da9e1.svg',
  account: 'https://mobile.unnispick.com/assets/account-137d6ae7.svg',
} as const;

function RemoteSvgIcon({
  uri,
  size = 26,
  dimmed = false,
}: { uri: string; size?: number; dimmed?: boolean }) {
  return (
    <SvgUri
      uri={uri}
      width={size}
      height={size}
      style={{ opacity: dimmed ? 0.6 : 1 }}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <RemoteSvgIcon uri={ICONS.home} dimmed={!focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: 'Produk',
          tabBarIcon: ({ focused }) => (
            <RemoteSvgIcon uri={ICONS.products} dimmed={!focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Akun',
          tabBarIcon: ({ focused }) => (
            <RemoteSvgIcon uri={ICONS.account} dimmed={!focused} />
          ),
        }}
      />
    </Tabs>
  );
}
