package pat.services;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpClient;
import java.io.IOException;
import java.net.URI;

public class ChuckNorris {

    public String getJoke() throws IOException, InterruptedException {
        //get a Chuck joke
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random"))
                .header("accept", "application/json")
                .header("X-RapidAPI-Key", "346eba727emshae5fb01cc81253dp140f80jsnfb7e5616ec1c")
                .header("X-RapidAPI-Host", "matchilling-chuck-norris-jokes-v1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

}
