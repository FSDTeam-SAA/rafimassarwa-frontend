import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const YoutubeVideo = () => {
  const axiosInstance = useAxios();

  const { data: YoutubeVideos = [], isLoading } = useQuery({
    queryKey: ["Youtube-Video"],
    queryFn: async () => {
      const res = await axiosInstance("/admin/youtubeVideos/get-all-videos");
      return res.data.data;
    },
  });

  const video = YoutubeVideos[0];

  if (isLoading)
    return <div className="mb-12 md:mb-16 text-center">Loading...</div>;

  return (
    <div className="mb-12 md:mb-16">
      <h1 className="text-3xl md:text-5xl mb-6 md:mb-10 font-semibold leading-tight">
        {video?.videoTitle}
      </h1>

      <div className="h-[500px] border border-gray-300 p-4 rounded-lg shadow-xl">
        <iframe
          className="w-full h-full rounded-lg shadow-sm"
          src={video?.videoLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeVideo;
