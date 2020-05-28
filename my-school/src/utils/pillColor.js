module.exports = function pillColor(subject){
    switch (subject) {
      case "English":
        return "red";
      case "Math":
        return "orange";
      case "Science":
        return "yellow";
      case "Social Studies":
        return "green";
      case "Art":
        return "teal";
      case "Music":
        return "blue";
      case "Health":
        return "cyan";
      case "Physical Education":
        return "purple";
      default:
        return "pink";
    }
  };