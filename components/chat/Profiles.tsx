import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ProfilesProps {
  username: string;
  uri: string;
}

const Profile = ({ username, uri }: ProfilesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={{ uri: uri }} style={styles.avatarStyle} />
      </View>
      <Text className="font-JakartaBold" style={styles.nameStyle}>
        {username}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
    marginRight: 17,
  },
  user: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    padding: 3,
    borderColor: '#fff',
  },
  avatarStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  nameStyle: {
    marginTop: 5,
    fontSize: 11,
    color: "#fff",
  },
});
