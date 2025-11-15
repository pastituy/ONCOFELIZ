import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const stylesIndex = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "400",
  },
  navigationBar: {
    flexDirection: "row",
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    fontSize: 18,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  moodScaleContainer: {
    gap: 16,
  },
  moodScaleLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  moodScaleLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  moodScale: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  moodNumber: {
    width: (width - 112) / 10,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  moodNumberSelected: {
    borderColor: "transparent",
    transform: [{ scale: 1.1 }],
  },
  moodNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  moodNumberTextSelected: {
    color: "#FFFFFF",
  },
  selectedMoodInfo: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  selectedMoodText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  historyContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  historyIconText: {
    fontSize: 18,
  },
  historyText: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  historySubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  historyArrow: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "600",
  },
  treatmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  treatmentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  treatmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  treatmentIconText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  treatmentText: {
    flex: 1,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  treatmentSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  infoIconContainer: {
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoContent: {
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  infoText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  assistantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  assistantContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  assistantIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  assistantIconText: {
    fontSize: 18,
  },
  assistantText: {
    flex: 1,
  },
  assistantTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 2,
  },
  assistantSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  assistantArrow: {
    fontSize: 18,
    color: "#64748B",
    fontWeight: "600",
  },
  helpContainer: {
    gap: 12,
  },
  helpButton: {
    backgroundColor: "#1E293B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  helpButtonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  helpButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  helpButtonSecondaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});