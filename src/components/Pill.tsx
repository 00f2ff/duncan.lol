type Props = {
  keyPrefix: string;
  tagName: string;
}

const styleVariants = {
  work: "bg-delftBlue text-white",
  poetry: "bg-lightCoral text-white",
  "🚂 of thought": "bg-celadon text-black",
  synesthesia: "bg-xanthous text-black",
  school: "bg-red text-white",
  storytime: "bg-tiffanyBlue text-black",
  software: "bg-quinacridoneMagenta text-white",
  meta: "bg-isabelline text-black",
  music: "bg-harvestGold text-black",

  // Digital Studio statuses 
  rough: "bg-persianOrange text-black",
  sanded: "bg-olivine text-black",
  polished: "bg-hunterGreen text-white",
  reformed: "bg-vistaBlue text-black",
}

export default function Pill({keyPrefix, tagName}: Props) {
  console.log(styleVariants[tagName])
  return (
    <div className={`font-medium text-base p-[1px] rounded-2xl ${styleVariants[tagName.toLocaleLowerCase()]}`} key={`${keyPrefix}-${tagName}`}>&nbsp;{tagName}&nbsp;</div>
  )
}