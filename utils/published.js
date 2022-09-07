export default function published(dataArray) {
  return dataArray.filter(item => item.published === true)
}
