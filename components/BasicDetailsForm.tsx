import React, { useState } from "react";
import { View, Text, Animated, StyleSheet, ScrollView } from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const steps = [
  "Basic Details",
  "Social Links",
  "Projects",
  "Flashcard Info",
];

export default function BasicDetailsForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
    },
    projects: [{ name: "", description: "", url: "" }],
    flashcard: {
      bestProject: "",
      shortDescription: "",
      threeSocialLinks: ["", "", ""],
    },
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: any, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InputField
              label="Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
            />
            <InputField
              label="Age"
              value={formData.age}
              onChangeText={(value) => handleInputChange("age", value)}
            />
            <InputField
              label="Gender"
              value={formData.gender}
              onChangeText={(value) => handleInputChange("gender", value)}
            />
            <InputField
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
            />
            <InputField
              label="Phone"
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
            />
          </>
        );
      case 1:
        return (
          <>
            <InputField
              label="GitHub"
              value={formData.socialLinks.github}
              onChangeText={(value) =>
                handleInputChange("socialLinks.github", value)
              }
            />
            <InputField
              label="LinkedIn"
              value={formData.socialLinks.linkedin}
              onChangeText={(value) =>
                handleInputChange("socialLinks.linkedin", value)
              }
            />
            <InputField
              label="Twitter"
              value={formData.socialLinks.twitter}
              onChangeText={(value) =>
                handleInputChange("socialLinks.twitter", value)
              }
            />
          </>
        );
      case 2:
        return formData.projects.map((project, index) => (
          <View key={index}>
            <InputField
              label={`Project ${index + 1} Name`}
              value={project.name}
              onChangeText={(value) =>
                handleInputChange(`projects[${index}].name`, value)
              }
            />
            <InputField
              label={`Project ${index + 1} Description`}
              value={project.description}
              onChangeText={(value) =>
                handleInputChange(`projects[${index}].description`, value)
              }
            />
            <InputField
              label={`Project ${index + 1} URL`}
              value={project.url}
              onChangeText={(value) =>
                handleInputChange(`projects[${index}].url`, value)
              }
            />
          </View>
        ));
      case 3:
        return (
          <>
            <InputField
              label="Best Project"
              value={formData.flashcard.bestProject}
              onChangeText={(value) =>
                handleInputChange("flashcard.bestProject", value)
              }
            />
            <InputField
              label="Short Description"
              value={formData.flashcard.shortDescription}
              onChangeText={(value) =>
                handleInputChange("flashcard.shortDescription", value)
              }
            />
            {formData.flashcard.threeSocialLinks.map((link, index) => (
              <InputField
                key={index}
                label={`Social Link ${index + 1}`}
                value={link}
                onChangeText={(value) =>
                  handleInputChange(`flashcard.threeSocialLinks[${index}]`, value)
                }
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 p-6">
      <Text className="text-xl font-bold text-center mb-6">
        Step {currentStep + 1}: {steps[currentStep]}
      </Text>

      {renderStepContent()}

      <View className="flex flex-row justify-between mt-6">
        {currentStep > 0 && (
          <CustomButton
            title="Back"
            onPress={handlePreviousStep}
            bgVariant="secondary"
          />
        )}
        {currentStep < steps.length - 1 ? (
          <CustomButton
            title="Next"
            onPress={handleNextStep}
            bgVariant="primary"
          />
        ) : (
          <CustomButton
            title="Submit"
            onPress={() => console.log("Form submitted", formData)}
            bgVariant="success"
          />
        )}
      </View>
    </ScrollView>
  );
}
