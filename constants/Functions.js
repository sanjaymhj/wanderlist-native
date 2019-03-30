import { Share } from "react-native";

/**
 * handleShare is used in the TripReportFooter which is created by
 * both the TripReportCard component and TripReportScreen.
 */
export const handleShare = async slug => {
  try {
    await Share.share({
      message: `Check out this Trip Report on Wanderlist:\nhttps://www.wanderlist.dev/p/${slug}/`
    });
  } catch (error) {
    console.log(error.message);
  }
};
