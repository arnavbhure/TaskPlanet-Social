const promoImage =
  "data:image/svg+xml,%3Csvg width='720' height='860' viewBox='0 0 720 860' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='720' height='860' rx='22' fill='%23f8fafc'/%3E%3Crect y='610' width='720' height='250' fill='%23000000'/%3E%3Ccircle cx='105' cy='118' r='38' fill='%23f97316'/%3E%3Ccircle cx='596' cy='126' r='52' fill='%23facc15'/%3E%3Ctext x='360' y='138' text-anchor='middle' font-family='Arial' font-size='58' font-weight='800' fill='%231e3a8a'%3EWays to%3C/text%3E%3Ctext x='360' y='222' text-anchor='middle' font-family='Arial' font-size='96' font-weight='900' fill='%2322c55e'%3EEARN%3C/text%3E%3Crect x='166' y='254' width='388' height='58' rx='18' fill='%230a84ff'/%3E%3Ctext x='360' y='291' text-anchor='middle' font-family='Arial' font-size='24' font-weight='700' fill='white'%3EClimb leaderboards and win rewards%3C/text%3E%3Crect x='55' y='360' width='176' height='210' rx='18' fill='white' stroke='%23bae6fd' stroke-width='4'/%3E%3Crect x='272' y='360' width='176' height='210' rx='18' fill='white' stroke='%23bfdbfe' stroke-width='4'/%3E%3Crect x='489' y='360' width='176' height='210' rx='18' fill='white' stroke='%23fed7aa' stroke-width='4'/%3E%3Ctext x='143' y='440' text-anchor='middle' font-family='Arial' font-size='25' font-weight='800' fill='%2316a34a'%3EMAIN%3C/text%3E%3Ctext x='360' y='440' text-anchor='middle' font-family='Arial' font-size='25' font-weight='800' fill='%230a84ff'%3EQUIZ%3C/text%3E%3Ctext x='577' y='440' text-anchor='middle' font-family='Arial' font-size='25' font-weight='800' fill='%23f97316'%3EREFERRAL%3C/text%3E%3Ctext x='143' y='525' text-anchor='middle' font-family='Arial' font-size='31' font-weight='900' fill='%2316a34a'%3E800000%2B%3C/text%3E%3Ctext x='360' y='525' text-anchor='middle' font-family='Arial' font-size='31' font-weight='900' fill='%230a84ff'%3E300000%2B%3C/text%3E%3Ctext x='577' y='525' text-anchor='middle' font-family='Arial' font-size='31' font-weight='900' fill='%23f97316'%3E400000%2B%3C/text%3E%3Ctext x='40' y='675' font-family='Arial' font-size='28' font-weight='700' fill='white'%3E78 likes%3C/text%3E%3Ctext x='40' y='724' font-family='Arial' font-size='28' fill='white'%3EReady to climb the leaderboards%3C/text%3E%3Ctext x='40' y='764' font-family='Arial' font-size='28' fill='white'%3Eand earn BIG rewards?%3C/text%3E%3C/svg%3E";

export const mockPosts = [
  {
    id: "post-1",
    avatarLabel: "UO",
    username: "Uyiosa Ogieobadan",
    handle: "@uyiosase73",
    timestamp: "13 hours ago",
    text: "Make money",
    metrics: {
      likes: 34,
      comments: 38,
      shares: 0,
    },
  },
  {
    id: "post-2",
    avatarLabel: "PM",
    username: "phillipa mulati",
    handle: "@phillltfg8",
    timestamp: "13 hours ago",
    text: "Hope you sleep well, I just shared task with so many people",
    image: {
      src: promoImage,
      alt: "Ways to earn promotional graphic",
    },
    metrics: {
      likes: 35,
      comments: 33,
      shares: 0,
    },
  },
  {
    id: "post-3",
    avatarLabel: "FL",
    username: "E Felix Lucky",
    handle: "@felixwbqn",
    timestamp: "13 hours ago",
    text: "Starting the day with more tasks and better focus. Keep climbing the leaderboard.",
    metrics: {
      likes: 18,
      comments: 12,
      shares: 2,
    },
  },
];
