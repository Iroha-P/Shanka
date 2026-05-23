export function createSession({ unlockAfter = 3, rewardSeconds = 30, cardIndex = 0 } = {}) {
  return {
    taskStatus: "idle",
    mode: "learning",
    unlockAfter,
    rewardSeconds,
    rewardRemainingSeconds: 0,
    completedInRound: 0,
    totalCompleted: 0,
    cardIndex,
    canOpenReward: false
  };
}

export function startTask(session) {
  return {
    ...session,
    taskStatus: "active",
    mode: "learning",
    rewardRemainingSeconds: 0
  };
}

export function pauseTask(session) {
  if (session.taskStatus !== "active") {
    return session;
  }

  return {
    ...session,
    taskStatus: "paused"
  };
}

export function resumeTask(session) {
  if (session.taskStatus !== "paused") {
    return session;
  }

  return {
    ...session,
    taskStatus: "active"
  };
}

export function endTask(session) {
  return {
    ...session,
    taskStatus: "idle",
    mode: "learning",
    completedInRound: 0,
    rewardRemainingSeconds: 0,
    canOpenReward: false
  };
}

export function applyTaskCommand(session, command) {
  switch (command) {
    case "start":
      return startTask(session);
    case "pause":
      return pauseTask(session);
    case "resume":
      return resumeTask(session);
    case "end":
      return endTask(session);
    default:
      throw new Error(`Unknown task command: ${command}`);
  }
}

export function answerCurrentCard(session, result) {
  if (session.taskStatus !== "active") {
    throw new Error("Task is not active.");
  }

  if (session.mode !== "learning") {
    throw new Error("Cards can only be answered during learning mode.");
  }

  const completedInRound = session.completedInRound + 1;

  return {
    ...session,
    completedInRound,
    totalCompleted: session.totalCompleted + 1,
    cardIndex: session.cardIndex + 1,
    lastResult: result,
    canOpenReward: completedInRound >= session.unlockAfter
  };
}

export function startReward(session) {
  if (session.taskStatus !== "active") {
    throw new Error("Task is not active.");
  }

  if (!session.canOpenReward) {
    throw new Error("Reward is locked until enough learning cards are completed.");
  }

  return {
    ...session,
    mode: "reward",
    rewardRemainingSeconds: session.rewardSeconds,
    canOpenReward: false
  };
}

export function tickReward(session) {
  if (session.mode !== "reward") {
    return session;
  }

  const rewardRemainingSeconds = Math.max(0, session.rewardRemainingSeconds - 1);

  return {
    ...session,
    rewardRemainingSeconds
  };
}

export function finishReward(session) {
  return {
    ...session,
    taskStatus: "active",
    mode: "learning",
    completedInRound: 0,
    rewardRemainingSeconds: 0,
    canOpenReward: false
  };
}
