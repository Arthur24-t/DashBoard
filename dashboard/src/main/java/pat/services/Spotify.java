package pat.services;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpClient;
import java.io.IOException;
import java.net.URI;

public class Spotify {
    
    public String getTop() throws IOException, InterruptedException {
		//get top playlist
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI"))
				.header("Authorization", "Bearer BQBstQJfGPcWFT091ozYz-LfS0o_lP-cuPnvxBTrBiQK9M3cg8PHDrrvMx0uCoyAVf8jLoiXq2p-bynsIHe_sAF1AyyKx-Y56JSRKtx_WcRJh0Wxq4p-gAAUUt-2cexOwQb9r8GwmH7kPoBQWB6UxYukesjDYaGr-b-cAq_o4w2VEfFbVd8YhpVM7rruL8u6jbDSRaPF4OnGuhBV")
				.header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		return response.body();
    }

    public String search(String title) throws IOException, InterruptedException {
		//get music
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://api.spotify.com/v1/search?q="+title+"&type=track"))
				.header("Authorization", "Bearer BQBstQJfGPcWFT091ozYz-LfS0o_lP-cuPnvxBTrBiQK9M3cg8PHDrrvMx0uCoyAVf8jLoiXq2p-bynsIHe_sAF1AyyKx-Y56JSRKtx_WcRJh0Wxq4p-gAAUUt-2cexOwQb9r8GwmH7kPoBQWB6UxYukesjDYaGr-b-cAq_o4w2VEfFbVd8YhpVM7rruL8u6jbDSRaPF4OnGuhBV")
                .header("Accept", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		return response.body();
    }

}
