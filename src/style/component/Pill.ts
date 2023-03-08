import { defineStyleConfig } from '@chakra-ui/react'

const Pill = defineStyleConfig({
  // The styles all pills have in common
  baseStyle: {
    padding: "1px",
    borderRadius: "md",
    marginLeft: "3",
    fontWeight: "500", 
    fontSize: "md",
    color: "brand.alabaster",
  },
  variants: {
    work: {
      backgroundColor: "brand.delftBlue",
    },
    poetry: {
      backgroundColor: "brand.lightCoral",
    },
    "🚂 of thought": {
      backgroundColor: "brand.celadon",
      color: "black"
    },
    synesthesia: {
      backgroundColor: "brand.xanthous",
      color: "black"
    },
    school: {
      backgroundColor: "brand.red",
    },
    storytime: {
      backgroundColor: "brand.tiffanyBlue",
      color: "black"
    },
    software: {
      backgroundColor: "brand.quinacridoneMagenta"
    },
    meta: {
      backgroundColor: "brand.isabelline",
      color: "black"
    },
    music: {
      backgroundColor: "brand.harvestGold",
      color: "black"
    }

  }
});

export default Pill;