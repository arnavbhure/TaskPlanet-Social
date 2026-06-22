import { Globe, LogIn, UserPlus } from "lucide-react";

export const navigationRoutes = [
  {
    path: "/",
    label: "Login",
    icon: LogIn,
  },
  {
    path: "/signup",
    label: "Signup",
    icon: UserPlus,
  },
  {
    path: "/feed",
    label: "Social",
    icon: Globe,
  },
];
