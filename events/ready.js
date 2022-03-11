require("colors")

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`connecter sur ${client.user.tag}`.green);
  }
}