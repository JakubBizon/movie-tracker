export default function formatDate(dateString: string) {
  let formattedDate = dateString.replaceAll("-", ".");
  formattedDate = formattedDate.slice(8);
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);

  formattedDate = `${formattedDate}.${month}.${year}`;

  return formattedDate;
}
