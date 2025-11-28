export function formatDate(ts = Date.now()){
  const d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}
