import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Pagination({ page, lastPage, onChange }:{
  page: number; lastPage: number; onChange: (p:number)=>void;
}) {
  const cur = Number.isFinite(page) ? page : 1;
  const last = Number.isFinite(lastPage) ? lastPage : 1;
  const max = 5;
  const start = Math.max(1, Math.min(cur - Math.floor(max/2), last - max + 1));
  const pages = Array.from({ length: Math.min(max, last) }, (_, i) => start + i);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
      <Pressable disabled={cur===1} onPress={()=>onChange(Math.max(1, cur-1))}>
        <Text style={{ color: cur===1 ? "#D1D5DB" : "#4B5563" }}>‹ Previous</Text>
      </Pressable>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {pages.map(p=>(
          <Pressable key={p} onPress={()=>onChange(p)}
            style={{ minWidth: 36, height: 36, borderRadius: 18,
                     alignItems:"center", justifyContent:"center",
                     borderWidth:1, borderColor: p===cur ? "#2b6cb0" : "#E5E7EB",
                     backgroundColor: p===cur ? "#2b6cb0" : "#fff" }}>
            <Text style={{ color: p===cur ? "#fff" : "#4B5563", fontWeight: p===cur ? "700" : "400" }}>{p}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable disabled={cur===last} onPress={()=>onChange(Math.min(last, cur+1))}>
        <Text style={{ color: cur===last ? "#D1D5DB" : "#4B5563" }}>Next ›</Text>
      </Pressable>
    </View>
  );
}
