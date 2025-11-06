import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, View } from "react-native";

const banners = [
  "https://wordpressunnis.s3.ap-southeast-1.amazonaws.com/images/feed/thumbnail/6879cc67d6e5f0f261659b3f.png",
  "https://wordpressunnis.s3.ap-southeast-1.amazonaws.com/images/banner/66f6799fd6e5f0cb707718bf.jpg",
  "https://wordpressunnis.s3.ap-southeast-1.amazonaws.com/images/feed/thumbnail/6879caedd6e5f0f261659b3d.png",
];

export default function BannerAutoFade() {
  const [idx, setIdx] = useState(0);
  const op = useRef(new Animated.Value(1)).current;
  const sc = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const id = setInterval(() => {
      Animated.parallel([
        Animated.timing(op, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(sc, { toValue: 1.05, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ]).start(() => {
        setIdx((p) => (p + 1) % banners.length);
        op.setValue(0); sc.setValue(1.05);
        Animated.parallel([
          Animated.timing(op, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(sc, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={{ marginTop: 12,  height: 180, borderRadius: 16, overflow: "hidden", backgroundColor: "#F3F4F6" }}>
      <Animated.View style={{ flex: 1, opacity: op, transform: [{ scale: sc }] }}>
        <Image source={{ uri: banners[idx] }} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
      </Animated.View>
    </View>
  );
}
