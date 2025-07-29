import YouTube from "react-youtube";

const YouTubeEmbed = ({ url }: { url: string }) => {
  const splitUrl = url.split("/");
  const [videoId, start] = splitUrl[splitUrl.length - 1].split("?start=");
  return (
    <div className="aspect-video">
      <YouTube 
        videoId={videoId}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            start: start ?? "0"
          }
        }}
        className="w-full h-full"
      />
    </div>
  );
}

export default YouTubeEmbed;