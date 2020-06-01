export function pillColor(subject){
    switch (subject) {
      case "English":
        return "red.300";
      case "Math":
        return "blue.300";
      case "Science":
        return "green.300";
      case "Social Studies":
        return "orange.300";
      case "Art":
        return "purple.300";
      case "Music":
        return "pink.300";
      case "Health":
        return "teal.100";
      case "Physical Education":
        return "yellow.300";
      default:
        return "cyan.300";
    }
  };