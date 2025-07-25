type Props = {
  keyPrefix: string;
  tagName: string;
}

const styleVariants = {
  work: "bg-blue text-black",
  poetry: "bg-coral text-white",
  "🚂 of thought": "bg-lightBlue text-black",
  synesthesia: "bg-deepBlue text-white",
  school: "bg-deepRed text-white",
  storytime: "bg-green text-white",
  software: "bg-orange text-white",
  meta: "bg-lightGreen text-black",
  music: "bg-gold text-black",

  // Digital Studio statuses 
  rough: "bg-marble text-black",
  sanded: "bg-deepViolet text-white",
  polished: "bg-deepGreen text-white",
  reformed: "bg-violetGray text-black",
}

export default function Pill({keyPrefix, tagName}: Props) {
  return (
    <div className={`font-medium text-base p-[1px] rounded-2xl ${styleVariants[tagName.toLocaleLowerCase()]}`} key={`${keyPrefix}-${tagName}`}>&nbsp;{tagName}&nbsp;</div>
  )
}