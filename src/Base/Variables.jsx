export let COOKIE_USER_ID_ALIAS = "_vzmqtp";
export let secondToMinOrHour = (seconds) => {
  let hour = Math.floor(seconds / 3600);
  let min = Math.floor((seconds % 3600) / 60);
  let sec = (seconds % 3600) % 60;
  return (
    (hour !== 0 ? hour + " h " : "") +
    (min !== 0 ? min + " min " : "") +
    (sec !== 0 ? sec + " s " : "")
  );
};

export let DarkThemes = [
  { state: "#000", Prcl: "#ff0000", btn: "#fff", name: "Dark Red" },
  { state: "#000", Prcl: "#ffb000", btn: "#000", name: "Dark Orange" },
  { state: "#000", Prcl: "#00ff00", btn: "#000", name: "Dark Green" },
  { state: "#000", Prcl: "#0026ff", btn: "#fff", name: "Dark Blue" },
];
export let LightThemes = [
  { state: "#fff", Prcl: "#ff0000", btn: "#fff", name: "Light Red" },
  { state: "#fff", Prcl: "#ffb000", btn: "#000", name: "Light Orange" },
  { state: "#fff", Prcl: "#00ff00", btn: "#000", name: "Light Green" },
  { state: "#fff", Prcl: "#0026ff", btn: "#fff", name: "Light Blue" },
];

export let Themes = [
  { state: "#000", Prcl: "#ff0000", btn: "#fff", name: "Dark Red" },
  { state: "#000", Prcl: "#ffb000", btn: "#000", name: "Dark Orange" },
  { state: "#000", Prcl: "#00ff00", btn: "#000", name: "Dark Green" },
  { state: "#000", Prcl: "#0026ff", btn: "#fff", name: "Dark Blue" },

  { state: "#fff", Prcl: "#ff0000", btn: "#fff", name: "Light Red" },
  { state: "#fff", Prcl: "#ffb000", btn: "#000", name: "Light Orange" },
  { state: "#fff", Prcl: "#00ff00", btn: "#000", name: "Light Green" },
  { state: "#fff", Prcl: "#0026ff", btn: "#fff", name: "Light Blue" },
];

