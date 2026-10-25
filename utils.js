
function timeToStringParts(timeMs) {
  const secondsLeft = Math.ceil(timeMs / 1000);

  const minutes = String(
    Math.trunc(secondsLeft / 60)
  );

  const seconds = String(
    secondsLeft % 60
  ).padStart(2, "0");

  return {
    minutes,
    seconds
  };
}
