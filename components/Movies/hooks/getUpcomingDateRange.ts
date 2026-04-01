export default function getUpcomingDateRange() {
  const from = new Date();
  const to = new Date();
  to.setMonth(to.getMonth() + 2);
  return { defaultFrom: from, defaultTo: to };
}
