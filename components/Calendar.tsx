import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import dayjs from "dayjs";
import { generateDate, months } from "@/utils/calendar";
import Icon from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "nativewind";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Calendar({
  setOpen,
  setDate,
  setAge,
}: {
  setOpen: (open: boolean) => void;
  setDate: (date: Date) => void;
  setAge: (age: number) => void;
}) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const calculateAge = (dob: dayjs.Dayjs) => {
    const today = dayjs();
    const age = today.diff(dob, "year");
    return age;
  };

  useEffect(() => {
    setAge(calculateAge(selectDate));
  }, [selectDate]);

  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`${colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"}`}
      style={styles.container}
    >
      <View style={styles.calendarWrapper}>
        <View style={styles.navigationButtons}>
          <View style={styles.yearNavigation}>
            <TouchableOpacity
              onPress={() => setToday(today.year(today.year() + 1))}
              style={styles.navButtonContainer}
            >
              <Icon
                name="arrow-up-circle-outline"
                size={28}
                color={"#4646fc"}
              />
            </TouchableOpacity>
            <Text
              className={`font-JakartaSemiBold text-[16px] text-[#000] ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Year
            </Text>
            <TouchableOpacity
              onPress={() => setToday(today.year(today.year() - 1))}
              style={styles.navButtonContainer}
            >
              <Icon
                name="arrow-down-circle-outline"
                size={28}
                color={"#4646fc"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.monthNavigation}>
            <TouchableOpacity
              onPress={() => setToday(today.month(today.month() + 1))}
              style={styles.navButtonContainer}
            >
              <Icon
                name="arrow-up-circle-outline"
                size={28}
                color={"#4646fc"}
              />
            </TouchableOpacity>
            <Text
              className={`font-JakartaSemiBold text-[16px] text-[#000] ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Month
            </Text>
            <TouchableOpacity
              onPress={() => setToday(today.month(today.month() - 1))}
              style={styles.navButtonContainer}
            >
              <Icon
                name="arrow-down-circle-outline"
                size={28}
                color={"#4646fc"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-2 mx-6">
          <Text
            className={`font-JakartaBold text-[18px] ${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            }`}
          >
            {months[today.month()]}, {today.year()}
          </Text>
        </View>

        <View style={styles.dayLabels}>
          {days.map((day, index) => (
            <Text
              key={index}
              style={styles.dayLabel}
              className="font-JakartaMedium"
            >
              {day}
            </Text>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.dateGrid}>
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectDate(date)}
                style={styles.dateWrapper}
                className="-pb-1"
              >
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                  } font-JakartaMedium`}
                  style={[
                    styles.dateText,
                    !currentMonth && styles.inactiveDate,
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString() && styles.selectedDate,
                  ]}
                >
                  {date.date()}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <View style={styles.scheduleWrapper}>
        <Text className="font-JakartaBold text-[16px]">
          DOB: {selectDate.toDate().toDateString()}
        </Text>
        <Text className="font-JakartaMedium mt-1" style={styles.noMeetingText}>
          Age: {calculateAge(selectDate)} years
        </Text>
      </View>
      <View className="absolute top-0 right-0 left-0 flex flex-row justify-between items-center mx-9 mt-4">
        <View className="flex flex-row items-center gap-2">
          <Icon name="calendar-outline" size={40} color={"#4646fc"} />
          <Text
            className={`font-JakartaBold text-[18px] ${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            }`}
          >
            Date Of Birth
          </Text>
        </View>
        <View className="flex flex-row gap-3 items-center">
          <View>
            <ThemeSwitcher />
          </View>
          <TouchableOpacity
            onPress={() => {
              setDate(selectDate.toDate());
              setOpen(false);
            }}
            className="bg-[#FF5E5E] rounded-[30px] p-[2px]"
          >
            <Icon name="close-sharp" size={36} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarWrapper: {
    width: 300,
    height: 450,
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  yearNavigation: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthNavigation: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButtonContainer: {
    padding: 10,
  },
  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  dayLabel: {
    width: 40,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  dateGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dateWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  dateText: {
    fontSize: 14,
  },
  inactiveDate: {
    color: "lightgray",
  },
  selectedDate: {
    width: 40,
    height: 40,
    backgroundColor: "#4646fc",
    color: "white",
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
  },
  scheduleWrapper: {
    width: 300,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  noMeetingText: {
    color: "gray",
  },
});
