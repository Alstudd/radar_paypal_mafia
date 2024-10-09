import FlashCard from "@/components/FlashCard";
import FlashcardWrapper from "@/components/FlashcardWrapper";
import { useSelectedMode } from "@/contexts/SelectedModeContext";
import RecruiterFlashcardWrapper from "@/components/recruiter/RecruiterFlashcardWrapper";
import CandidateFlashcard from "@/components/CandidateFlashcard";
import IdeatorFlashcard from "@/components/IdeatorFlashcard";
import JobFlashcard from "@/components/JobFlashcard";
import InvestorFlashcard from "@/components/InvestorFlashcard";
import { useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOkto, User, type OktoContextType } from "okto-sdk-react-native";
import React, { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/fetch";
import { icons } from "@/constants";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import UserFlashcard from "@/components/UserFlashcard";
import Icon from "@expo/vector-icons/Ionicons";
import WalletConnection from "@/components/WalletConnection";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { StatusBar } from "expo-status-bar";
import SolanaWallet from "@/components/SolanaWallet";

interface UserData {
  name: string;
  email: string;
  designation: string;
  profilebio: string;
  walletaddress: string;
  skills: string[];
  interests: string[];
  domains: string[];
  projects: { title: string; description: string; link: string }[];
  sociallinks: { icon: string; link: string; username: string }[];
  achievements: string[];
  selectedgender: string;
  age: number;
  profilepicture: string;
  resume: string;
  date_of_birth: string;
  isinvestor: boolean;
  isrecruiter: boolean;
  companyId: string;
}

interface Ideator {
  name: string;
  ideaTitle: string;
  ideaDescription: string;
  profileImage: string;
  links: { name: string; url: string; icon: any; iconColor: string }[];
  fundingNeeded: string;
  potentialRevenue: string;
  prototypeLink?: string;
  videoPitchLink?: string;
}

interface Investor {
  name: string;
  ideaTitle: string;
  investmentFocus: string;
  profileImage: string;
  links: { name: string; url: string; icon: any; iconColor: string }[];
  fundingNeeded: string;
  expectedROI: string;
  investmentStage: string;
  notableInvestments: string[];
}

interface Job {
  jobTitle: string;
  companyName: string;
  location: string;
  jobSummary: string;
  responsibilities: string[];
  qualifications: string[];
  salaryRange: string;
  benefits: string[];
  companyLogo?: string;
  applicationLink: string;
}

const ideators: Ideator[] = [
  {
    name: "Jane Doe",
    ideaTitle: "EcoKart: Sustainable Online Marketplace",
    ideaDescription:
      "EcoKart is an innovative e-commerce platform focused on selling eco-friendly and sustainable products. Our goal is to revolutionize the way people shop by offering them environmentally conscious alternatives for everyday products, from clothing to household items.",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/janedoe",
        icon: "logo-linkedin",
        iconColor: "#0e76a8",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/janedoe",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
    ],
    fundingNeeded: "$500,000",
    potentialRevenue: "$3,000,000 annually by Year 2",
    prototypeLink: "https://www.figma.com/proto/EcoKart",
    videoPitchLink: "https://www.youtube.com/watch?v=EcoKartPitch",
  },
  {
    name: "Jane Doe",
    ideaTitle: "EcoKart: Sustainable Online Marketplace",
    ideaDescription:
      "EcoKart is an innovative e-commerce platform focused on selling eco-friendly and sustainable products. Our goal is to revolutionize the way people shop by offering them environmentally conscious alternatives for everyday products, from clothing to household items.",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/janedoe",
        icon: "logo-linkedin",
        iconColor: "#0e76a8",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/janedoe",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
    ],
    fundingNeeded: "$500,000",
    potentialRevenue: "$3,000,000 annually by Year 2",
    prototypeLink: "https://www.figma.com/proto/EcoKart",
    videoPitchLink: "https://www.youtube.com/watch?v=EcoKartPitch",
  },
  {
    name: "Jane Doe",
    ideaTitle: "EcoKart: Sustainable Online Marketplace",
    ideaDescription:
      "EcoKart is an innovative e-commerce platform focused on selling eco-friendly and sustainable products. Our goal is to revolutionize the way people shop by offering them environmentally conscious alternatives for everyday products, from clothing to household items.",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    links: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/janedoe",
        icon: "logo-linkedin",
        iconColor: "#0e76a8",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/janedoe",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
    ],
    fundingNeeded: "$500,000",
    potentialRevenue: "$3,000,000 annually by Year 2",
    prototypeLink: "https://www.figma.com/proto/EcoKart",
    videoPitchLink: "https://www.youtube.com/watch?v=EcoKartPitch",
  },
];

const investors: Investor[] = [
  {
    name: "Alex Thompson",
    ideaTitle: "Tech Innovations for Tomorrow",
    investmentFocus: "AI, Blockchain, and Fintech",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with a valid image URL
    links: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/alexthompson",
        icon: "logo-linkedin",
        iconColor: "#0077B5",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/alexthompson",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
      {
        name: "Website",
        url: "https://alexthompsoninvestments.com",
        icon: "link",
        iconColor: "#3B82F6",
      },
    ],
    fundingNeeded: "$500,000",
    expectedROI: "25% over 5 years",
    investmentStage: "Seed and Series A",
    notableInvestments: [
      "Innovative Health Tech",
      "Smart Home Solutions",
      "Eco-Friendly Products",
    ],
  },
  {
    name: "Alex Thompson",
    ideaTitle: "Tech Innovations for Tomorrow",
    investmentFocus: "AI, Blockchain, and Fintech",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with a valid image URL
    links: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/alexthompson",
        icon: "logo-linkedin",
        iconColor: "#0077B5",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/alexthompson",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
      {
        name: "Website",
        url: "https://alexthompsoninvestments.com",
        icon: "link",
        iconColor: "#3B82F6",
      },
    ],
    fundingNeeded: "$500,000",
    expectedROI: "25% over 5 years",
    investmentStage: "Seed and Series A",
    notableInvestments: [
      "Innovative Health Tech",
      "Smart Home Solutions",
      "Eco-Friendly Products",
    ],
  },
  {
    name: "Alex Thompson",
    ideaTitle: "Tech Innovations for Tomorrow",
    investmentFocus: "AI, Blockchain, and Fintech",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with a valid image URL
    links: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/alexthompson",
        icon: "logo-linkedin",
        iconColor: "#0077B5",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/alexthompson",
        icon: "logo-twitter",
        iconColor: "#1DA1F2",
      },
      {
        name: "Website",
        url: "https://alexthompsoninvestments.com",
        icon: "link",
        iconColor: "#3B82F6",
      },
    ],
    fundingNeeded: "$500,000",
    expectedROI: "25% over 5 years",
    investmentStage: "Seed and Series A",
    notableInvestments: [
      "Innovative Health Tech",
      "Smart Home Solutions",
      "Eco-Friendly Products",
    ],
  },
];

const jobs: Job[] = [
  {
    jobTitle: "Frontend Developer",
    companyName: "Tech Innovations Inc.",
    location: "Remote",
    jobSummary:
      "Join our team to build amazing user interfaces for our web applications.",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable code and libraries for future use",
      "Ensure the technical feasibility of UI/UX designs",
    ],
    qualifications: [
      "Proficient in HTML, CSS, and JavaScript",
      "Experience with React.js or similar frameworks",
      "Understanding of responsive design principles",
    ],
    salaryRange: "$60,000 - $80,000",
    benefits: [
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
    ],
    companyLogo: "https://example.com/logo.png",
    applicationLink: "https://example.com/apply",
  },
  {
    jobTitle: "Frontend Developer",
    companyName: "Tech Innovations Inc.",
    location: "Remote",
    jobSummary:
      "Join our team to build amazing user interfaces for our web applications.",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable code and libraries for future use",
      "Ensure the technical feasibility of UI/UX designs",
    ],
    qualifications: [
      "Proficient in HTML, CSS, and JavaScript",
      "Experience with React.js or similar frameworks",
      "Understanding of responsive design principles",
    ],
    salaryRange: "$60,000 - $80,000",
    benefits: [
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
    ],
    companyLogo: "https://example.com/logo.png",
    applicationLink: "https://example.com/apply",
  },
  {
    jobTitle: "Frontend Developer",
    companyName: "Tech Innovations Inc.",
    location: "Remote",
    jobSummary:
      "Join our team to build amazing user interfaces for our web applications.",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable code and libraries for future use",
      "Ensure the technical feasibility of UI/UX designs",
    ],
    qualifications: [
      "Proficient in HTML, CSS, and JavaScript",
      "Experience with React.js or similar frameworks",
      "Understanding of responsive design principles",
    ],
    salaryRange: "$60,000 - $80,000",
    benefits: [
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
    ],
    companyLogo: "https://example.com/logo.png",
    applicationLink: "https://example.com/apply",
  },
];

const Flashcards = () => {
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { selectedMode } = useSelectedMode();
  const { colorScheme } = useColorScheme();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { getUserDetails } = useOkto() as OktoContextType;

  useEffect(() => {
    if (!isClerkSignedIn) {
      getUserDetails()
        .then((result: User) => {
          setUserDetails(result);
        })
        .catch((error) => {
          console.error("Error fetching Okto user details:", error);
        });
    }
  }, [isClerkSignedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/(api)/profile", {
          method: "GET",
        });
        const { data } = await response.json();
        let user;
        if (isClerkSignedIn) {
          user = data.filter(
            (user: any) =>
              user.email !== clerkUser?.primaryEmailAddress?.emailAddress
          );
        } else if (userDetails) {
          user = data.filter((user: any) => user.email !== userDetails?.email);
        }
        setUsers(user);
        setLoading(false);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFetchError("Failed to load user data.");
        setLoading(false);
      }
    };
    if (isClerkSignedIn || userDetails) {
      fetchData();
    }
  }, [isClerkSignedIn, clerkUser, userDetails]);

  const onSwipeLeft = (user: any) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user: any) => {
    console.warn("swipe right: ", user.name);
  };

  return (
    <View
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      }`}
    >
      <StatusBar
        backgroundColor={colorScheme == "dark" ? "black" : "white"}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      {loading ? (
        <View className="flex items-center justify-center h-full">
          <ActivityIndicator size="large" color="#4646fc" />
        </View>
      ) : fetchError ? (
        <Text className="text-red-500 text-center">{fetchError}</Text>
      ) : (
        <>
          {selectedMode === "User" && (
            <View style={styles.pageContainer}>
              <FlashcardWrapper
                data={users}
                renderItem={({ item }: { item: UserData }) => (
                  <UserFlashcard user={item} />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
          )}
          {selectedMode === "Recruiter" && (
            <View style={styles.pageContainer}>
              <FlashcardWrapper
                data={users}
                renderItem={({ item }: { item: UserData }) => (
                  <CandidateFlashcard candidate={item} />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
            // <RecruiterFlashcardWrapper />
          )}
          {selectedMode === "Candidate" && (
            <View style={styles.pageContainer}>
              <FlashcardWrapper
                data={jobs}
                renderItem={({ item }: { item: Job }) => (
                  <JobFlashcard job={item} />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
          )}
          {selectedMode === "Investor" && (
            <View style={styles.pageContainer}>
              <FlashcardWrapper
                data={ideators}
                renderItem={({ item }: { item: Ideator }) => (
                  <IdeatorFlashcard ideator={item} />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
          )}
          {selectedMode === "Ideator" && (
            <View style={styles.pageContainer}>
              <FlashcardWrapper
                data={investors}
                renderItem={({ item }: { item: Investor }) => (
                  <InvestorFlashcard investor={item} />
                )}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});

export default Flashcards;
