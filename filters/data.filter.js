export default function dateFilter(value, format = "date"){
  const option = {}
  if(format.includes('date')){
    option.day = '2-digit'
    option.month = 'long'
    option.year = 'numeric'
  }
  return new Intl.DateTimeFormat('ru-RU', option).format(new Date(value))
}