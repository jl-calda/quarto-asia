import {
  Bed,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  Heart,
  ImagePlus,
  LogOut,
  LucideProps,
  MessageSquare,
  User,
  XCircle,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-door-open"
      {...props}
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14"></path>
      <path d="M2 20h3"></path>
      <path d="M13 20h9"></path>
      <path d="M10 12v.01"></path>
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"></path>
    </svg>
  ),
  logout: LogOut,
  heart: Heart,
  calendar: CalendarClock,
  bed: Bed,
  user: User,
  chat: MessageSquare,
  chevron: ChevronDown,
  calendarPick: CalendarDays,
  imageUpload: ImagePlus,
  closeCircle: XCircle,
}
