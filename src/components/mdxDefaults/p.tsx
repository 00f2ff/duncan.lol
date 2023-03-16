import { TextProps, AspectRatio, Text } from "@chakra-ui/react";
import YouTube from "react-youtube";
import { commonProps } from "./common";

export default function p(props: TextProps) {
  // iframe check
  if (props.children?.toString().includes("https://www.youtube-nocookie.com")) {
    const splitUrl = props.children.toString().split("/");
    const [videoId, start] = splitUrl[splitUrl.length - 1].split("?start=");
    console.log(start);
    return (
      <AspectRatio maxW="100%" ratio={16 / 9} >
        <YouTube 
          videoId={videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              start: start ?? "0"
            }
          }}
        />
      </AspectRatio>
    );
  }
  return <Text {...commonProps} {...props}>{props.children}</Text>
}