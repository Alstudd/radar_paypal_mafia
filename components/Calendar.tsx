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

  return (
    <View className="bg-white" style={styles.container}>
      <View style={styles.calendarWrapper}>
        <View style={styles.navigationButtons}>
          <View style={styles.yearNavigation}>
            <TouchableOpacity
              onPress={() => setToday(today.year(today.year() + 1))}
              style={styles.navButtonContainer}
            >
              <Icon name="arrow-up-circle" size={28} color="#0286FF" />
            </TouchableOpacity>
            <Text className="font-JakartaSemiBold text-[16px] text-[#000]">
              Year
            </Text>
            <TouchableOpacity
              onPress={() => setToday(today.year(today.year() - 1))}
              style={styles.navButtonContainer}
            >
              <Icon name="arrow-down-circle" size={28} color="#0286FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.monthNavigation}>
            <TouchableOpacity
              onPress={() => setToday(today.month(today.month() + 1))}
              style={styles.navButtonContainer}
            >
              <Icon name="arrow-up-circle" size={28} color="#0286FF" />
            </TouchableOpacity>
            <Text className="font-JakartaSemiBold text-[16px] text-[#000]">
              Month
            </Text>
            <TouchableOpacity
              onPress={() => setToday(today.month(today.month() - 1))}
              style={styles.navButtonContainer}
            >
              <Icon name="arrow-down-circle" size={28} color="#0286FF" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="my-2 mx-6">
          <Text className="font-JakartaBold text-[18px]">
            {months[today.month()]}, {today.year()}
          </Text>
        </View>

        <View style={styles.dayLabels}>
          {days.map((day, index) => (
            <Text key={index} style={styles.dayLabel}>
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
              >
                <Text
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
      <View className="absolute top-0 right-9">
        <TouchableOpacity
          onPress={() => {
            setDate(selectDate.toDate());
            setOpen(false);
          }}
        >
          <Icon name="close-circle" size={50} color="#FF5E5E" />
        </TouchableOpacity>
      </View>
      <View className="absolute top-1 left-9">
        <TouchableOpacity
          className="flex flex-row items-center gap-2"
          onPress={() => {
            setDate(selectDate.toDate());
            setOpen(false);
          }}
        >
          <Icon name="calendar" size={40} color="#0286FF" />
          <Text className="font-JakartaBold text-[20px]">Date Of Birth</Text>
        </TouchableOpacity>
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
    fontSize: 16,
  },
  inactiveDate: {
    color: "lightgray",
  },
  selectedDate: {
    width: 40,
    backgroundColor: "#0286FF",
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
