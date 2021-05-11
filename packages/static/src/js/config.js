module.exports = {
    apiBaseURL: "http://localhost:8080/api",
    storageBaseURL: "http://localhost:8080/storage",

    inviteURL: `https://discord.com/oauth2/authorize?client_id=${
        process.env.REACT_APP_DISCORD_BOT_CLIENT_ID
    }&scope=bot&permissions=1342318608`,

    animationSpeed: 1000,

    linkActivationMargin: window.innerHeight / 4,

    colors: [
        "#1abc9c",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#95a5a6"
    ]
}
