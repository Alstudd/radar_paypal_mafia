import React from "react";
import { View, StyleSheet } from "react-native";
import FlashCard from "@/components/FlashCard";
import FlashcardWrapper from "@/components/FlashcardWrapper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import UserFlashcard from "@/components/UserFlashcard";
import { useSelectedMode } from "@/contexts/SelectedModeContext";
import RecruiterFlashcardWrapper from "@/components/recruiter/RecruiterFlashcardWrapper";
// import users from "@/assets/data/users";

interface User {
  name: string;
  title: string;
  achievements: string[];
  jobSummary: string;
  interests: string[];
  skills: string[];
  projects: { title: string; description: string; link?: string }[];
  profileImage: string;
  socialLinks: { name: string; url: string; icon: any; iconColor: string }[];
}

const Search = () => {
  const { selectedMode } = useSelectedMode();

  const users: User[] = [
    {
      name: "Alice Smith",
      title: "Blockchain Developer",
      achievements: [
        "Built a DeFi protocol",
        "Contributed to Ethereum core",
        "2 Years of Experience",
      ],
      jobSummary:
        "Passionate about building decentralized applications and protocols.",
      interests: [
        "Ethereum",
        "Smart Contracts",
        "Decentralized Finance",
        "React",
        "Crypto",
      ],
      skills: ["Solidity", "JavaScript", "React", "Node.js", "Web3"],
      projects: [
        {
          title: "Decentralized Exchange",
          description:
            "A fully decentralized exchange built on Ethereum allowing peer-to-peer trading.",
          link: "https://github.com/alicesmith/dec_exchange",
        },
        {
          title: "NFT Marketplace",
          description: "An NFT marketplace for artists and collectors.",
          link: "https://github.com/alicesmith/nft-marketplace",
        },
      ],
      profileImage:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-headphones_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727308800&semt=ais_hybrid",
      socialLinks: [
        {
          name: "GitHub",
          url: "https://github.com/alicesmith",
          icon: "logo-github",
          iconColor: "#000",
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/alicesmith",
          icon: "logo-linkedin",
          iconColor: "#0077B5",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/alicesmith",
          icon: "logo-twitter",
          iconColor: "#1DA1F2",
        },
      ],
    },
    {
      name: "Bob Johnson",
      title: "Frontend Engineer",
      achievements: [
        "Created 10+ production-level applications",
        "Expert in React and TypeScript",
        "3 Years of Experience",
      ],
      jobSummary:
        "Seeking new challenges in frontend development with a focus on user experience.",
      interests: [
        "User Experience",
        "React",
        "TypeScript",
        "Design Systems",
        "Open Source",
      ],
      skills: ["React", "TypeScript", "CSS", "GraphQL", "Redux"],
      projects: [
        {
          title: "E-commerce Platform",
          description:
            "A feature-rich e-commerce platform with real-time inventory.",
          link: "https://github.com/bobjohnson/e-commerce-platform",
        },
        {
          title: "Personal Blog",
          description: "A blog site built with Gatsby and headless CMS.",
          link: "https://github.com/bobjohnson/personal-blog",
        },
      ],
      profileImage:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-laptop_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727308800&semt=ais_hybrid",
      socialLinks: [
        {
          name: "GitHub",
          url: "https://github.com/alicesmith",
          icon: "logo-github",
          iconColor: "#000",
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/alicesmith",
          icon: "logo-linkedin",
          iconColor: "#0077B5",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/alicesmith",
          icon: "logo-twitter",
          iconColor: "#1DA1F2",
        },
      ],
    },
    {
      name: "Charlie Brown",
      title: "Data Scientist",
      achievements: [
        "Published research on AI in blockchain",
        "Built predictive models for finance",
        "4 Years of Experience",
      ],
      jobSummary:
        "Aiming to leverage data for strategic insights in the blockchain sector.",
      interests: [
        "Data Analysis",
        "Machine Learning",
        "Blockchain",
        "Python",
        "Big Data",
      ],
      skills: ["Python", "R", "SQL", "Machine Learning", "Data Visualization"],
      projects: [
        {
          title: "AI Trading Bot",
          description:
            "A trading bot that uses machine learning algorithms to trade cryptocurrencies.",
          link: "https://github.com/charliebrown/ai-trading-bot",
        },
        {
          title: "Data Visualization Dashboard",
          description:
            "An interactive dashboard to visualize blockchain transaction data.",
          link: "https://github.com/charliebrown/data-viz-dashboard",
        },
      ],
      profileImage:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727308800&semt=ais_hybrid",
      socialLinks: [
        {
          name: "GitHub",
          url: "https://github.com/alicesmith",
          icon: "logo-github",
          iconColor: "#000",
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/alicesmith",
          icon: "logo-linkedin",
          iconColor: "#0077B5",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/alicesmith",
          icon: "logo-twitter",
          iconColor: "#1DA1F2",
        },
      ],
    },
    {
      name: "Diana Prince",
      title: "Product Manager",
      achievements: [
        "Launched 5 successful products",
        "Expert in Agile methodologies",
        "6 Years of Experience",
      ],
      jobSummary:
        "Focusing on product strategy and user engagement in the blockchain space.",
      interests: [
        "Product Strategy",
        "User Engagement",
        "Blockchain",
        "Agile",
        "Leadership",
      ],
      skills: [
        "Product Management",
        "Agile",
        "Scrum",
        "User Research",
        "Stakeholder Management",
      ],
      projects: [
        {
          title: "Blockchain Voting System",
          description:
            "A product that enables secure voting through blockchain technology.",
          link: "https://github.com/dianaprince/blockchain-voting-system",
        },
        {
          title: "Supply Chain Management Tool",
          description:
            "A tool to enhance transparency in supply chain operations using blockchain.",
          link: "https://github.com/dianaprince/supply-chain-tool",
        },
      ],
      profileImage:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-a-tablet_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1727308800&semt=ais_hybrid",
      socialLinks: [
        {
          name: "GitHub",
          url: "https://github.com/alicesmith",
          icon: "logo-github",
          iconColor: "#000",
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/alicesmith",
          icon: "logo-linkedin",
          iconColor: "#0077B5",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/alicesmith",
          icon: "logo-twitter",
          iconColor: "#1DA1F2",
        },
      ],
    },
  ];

  const onSwipeLeft = (user: User) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user: User) => {
    console.warn("swipe right: ", user.name);
  };

  return (
    <>
      {selectedMode === "User" && (
        <View style={styles.pageContainer}>
          <FlashcardWrapper
            data={users}
            renderItem={({ item }: { item: User }) => (
              <UserFlashcard user={item} />
            )}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
        </View>
      )}
      {selectedMode === "Recruiter" && <RecruiterFlashcardWrapper />}
    </>
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

export default Search;
