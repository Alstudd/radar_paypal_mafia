import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
  const { isSignedIn } = useAuth();

  // Get flashcard data from the server: if data then redirect to home else redirect to user flashcard form
  // if (isSignedIn) {
  //   if (data) {
  //     return <Redirect href="/(root)/(tabs)/home" />;
  //   } else {
  //     return <Redirect href="/(root)/userFlashcardForm" />;
  //   }
  // }

  if (isSignedIn) return <Redirect href="/(root)/userFlashcardForm" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
