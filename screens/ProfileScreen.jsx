import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { signOut } from "firebase/auth";
import { Firebase_Auth } from "../App";

export default function ProfileScreen() {
  const user = Firebase_Auth.currentUser;
  const handleLogout = async () => {
    try {
      await signOut(Firebase_Auth);
    } catch (error) {
      Alert.error("Errore durante il logout", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{user.displayName}</Text>

          <Text style={styles.profileEmail}>
            {user ? user.email : "Email non disponibile"}
          </Text>

          <TouchableOpacity
            onPress={() => {
              handleLogout;
            }}
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 48,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 12,
    border: 1,
    borderColor: "grey",
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
