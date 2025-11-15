const messageOne = (email, hostName, gameId, domain) => {
  return {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@codewords.com",
    subject: `${hostName} has invited you to play CodeWords`,
    html: `Hey there! ${hostName} has invited you to play CodeWords - an exciting multiplayer word guessing game! <br><br>
    <a href="${domain}/${gameId}" style="background-color: #32be72; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Join the Game</a><br><br>
    Get ready for a strategic battle of wits!`,
  };
};

module.exports = { messageOne };
