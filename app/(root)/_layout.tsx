import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="discussion" options={{ headerShown: false }} />
      <Stack.Screen name="userFlashcardForm" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
