import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex:1, backgroundColor:"#fff" }}>
      <View style={{ paddingHorizontal:16, paddingTop:12, paddingBottom:8, borderBottomWidth:1, borderColor:"#F3F4F6" }}>
        <Text style={{ fontSize:16, fontWeight:"700", color:"#111827" }}>Akun Saya</Text>
      </View>

      <View style={{ alignItems:"center", marginTop:20 }}>
        <Image source={{ uri:"https://i.pravatar.cc/120?img=32" }} style={{ width:80, height:80, borderRadius:40 }} />
        <Text style={{ marginTop:8, fontSize:16, fontWeight:"700", color:"#111827" }}>Hanin Aulia</Text>
        <Text style={{ color:"#6B7280", marginTop:2, fontSize:12 }}>hanin.aulia@example.com</Text>
      </View>

      <View style={{ marginTop:24, paddingHorizontal:16 }}>
        {["Edit Profil","Pesanan Saya","Riwayat Transaksi","Bantuan & FAQ"].map((m)=>(
          <View key={m} style={{ paddingVertical:14, borderBottomWidth:1, borderColor:"#F3F4F6" }}>
            <Text style={{ color:"#374151", fontSize:14 }}>{m}</Text>
          </View>
        ))}
        <Pressable style={{ marginTop:20, backgroundColor:"#2ec4b6", paddingVertical:12, borderRadius:12 }}>
          <Text style={{ color:"#fff", textAlign:"center", fontWeight:"700" }}>Keluar</Text>
        </Pressable>
      </View>
    </View>
  );
}
