export default function getUpcomingDateRange() {
  const from = new Date();
  const to = new Date();
  to.setMonth(to.getMonth() + 1);
  return { defaultFrom: from, defaultTo: to };
}
