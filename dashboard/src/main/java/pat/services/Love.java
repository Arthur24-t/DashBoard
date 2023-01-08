package pat.services;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpClient;
import java.io.IOException;
import java.net.URI;

public class Love {

    public String getLove(String prenom1, String prenom2) throws IOException, InterruptedException {
		//get love
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://love-calculator.p.rapidapi.com/getPercentage?fname="+prenom1+"&sname="+prenom2+""))
				.header("X-RapidAPI-Key", "346eba727emshae5fb01cc81253dp140f80jsnfb7e5616ec1c")
				.header("X-RapidAPI-Host", "love-calculator.p.rapidapi.com")
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		return response.body();
    }

}
