export function formatChange(change) {
  if (change >= 0) {
    return `+${change}%`;
  }
  return `${change}%`;
}

export function getChangeSign(change) {
  return change >= 0 ? 'positive' : 'negative';
}
