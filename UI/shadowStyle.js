import { Platform } from "react-native";
import { colors } from "./theme";

export const platformStyle = {
    shadow: {
        ...Platform.select({
          android: {
            elevation: 4,
          },
          ios: {
            shadowColor: colors.border,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        }),
    }
};
