export default function SuperConsoleLog(arg, canlog) {
  if (canlog > 10) return;
  console.log(arg);
}
