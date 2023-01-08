package pat.services;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Random;
import java.net.http.HttpClient;
import java.io.IOException;
import java.net.URI;

public class Pokemon {

    public String getRandom() throws IOException, InterruptedException {
		//Get a random pokemon from api 
        Random rand = new Random();
        int id = rand.nextInt((906 - 1) + 1) + 1;
        
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://pokeapi.co/api/v2/pokemon/"+id))
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		return response.body();
    }

	public String getPokemon(String name) throws IOException, InterruptedException {
        //get pokemon info from api
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://pokeapi.co/api/v2/pokemon/"+name))
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		return response.body();
    }


    public String getEvolution(String id) throws IOException, InterruptedException {
		//get pokemon evolution from api
      
        HttpRequest request = HttpRequest.newBuilder()
				.uri(URI.create("https://pokeapi.co/api/v2/evolution-chain/"+id))
				.method("GET", HttpRequest.BodyPublishers.noBody())
				.build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		System.out.println(response.body());
		return response.body();
    }
}