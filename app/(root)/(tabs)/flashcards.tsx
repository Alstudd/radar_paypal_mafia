import React from "react";
import { View, StyleSheet } from "react-native";
import FlashCard from "@/components/FlashCard";
import FlashcardWrapper from "@/components/FlashcardWrapper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import UserFlashcard from "@/components/UserFlashcard";
import { useSelectedMode } from "@/contexts/SelectedModeContext";
import RecruiterFlashcardWrapper from "@/components/recruiter/RecruiterFlashcardWrapper";
import { useColorScheme } from "nativewind";
import CandidateFlashcard from "@/components/CandidateFlashcard";
import IdeatorFlashcard from "@/components/IdeatorFlashcard";
import JobFlashcard from "@/components/JobFlashcard";
import InvestorFlashcard from "@/components/InvestorFlashcard";
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
  const { selectedMode } = useSelectedMode();
  const { colorScheme } = useColorScheme();

  const onSwipeLeft = (user: User) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user: User) => {
    console.warn("swipe right: ", user.name);
  };

  return (
    <View
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      }`}
    >
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
      {selectedMode === "Recruiter" && (
        <View style={styles.pageContainer}>
          <FlashcardWrapper
            data={users}
            renderItem={({ item }: { item: User }) => (
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
