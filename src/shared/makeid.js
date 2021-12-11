export default function makeid(name) {
  let chars = "ABCDEFGHIJKLMNOPRSTQUWXYZ";
  let nums = "0123456789";
  let newId = name[0]?.toUpperCase() + name[1]?.toUpperCase();

  if (newId.length !== 2) {
    newId = "";
    for (let i = 0; i < 2; i++) {
      let lucky = Math.floor(Math.random() * 26);
      newId += chars[lucky];
    }
  }
  //looking for exactly 4 random digits so hardcoding 4
  for (let i = 0; i < 4; i++) {
    let lucky = Math.floor(Math.random() * 10);
    newId += nums[lucky];
  }
  return newId;
}
