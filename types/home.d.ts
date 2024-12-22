export interface ShortcutButton {
  id: string;
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

export interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  views: number;
}

export interface Activity {
  id: string;
  type: "event" | "announcement" | "deadline";
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

export interface HeaderProps {
  temperature: number;
  profileImage: string;
  onProfilePress: () => void;
}

export interface ShortcutButtonsProps {
  buttons: ShortcutButton[];
}

export interface ShortVideosProps {
  videos: VideoItem[];
  onVideoPress: (videoId: string) => void;
}

export interface ActivityFeedProps {
  activities: Activity[];
}

export interface AnnouncementCardProps {
  title: string;
  content: string;
  type?: "quote" | "announcement";
  onPress?: () => void;
}
