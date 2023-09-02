import YouTube from "react-youtube";

// TODO: more idomatic tailwind embeds with iframe link. Is the plugin still required too?
const YouTubeEmbed = ({ url }: { url: string }) => {
  const splitUrl = url.split("/");
  const [videoId, start] = splitUrl[splitUrl.length - 1].split("?start=");
  return (
    <div className="aspect-w-16 aspect-h-9">
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
    </div>
  );
}

export default YouTubeEmbed;