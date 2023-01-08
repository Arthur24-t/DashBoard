
package pat.view;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.*;


@RestController
public class Pokemon {
    @CrossOrigin(origins = "*")
    @GetMapping("/getPokemon")
    public String hello() throws IOException, InterruptedException {
        pat.services.Pokemon pokemon = new pat.services.Pokemon();
        return pokemon.getRandom();
    }


    @CrossOrigin(origins = "*")
    @PostMapping("/getEvolution")
    public String evolution(@RequestBody Map<String, Object> pokemons) throws IOException, InterruptedException {
        pat.services.Pokemon pokemon = new pat.services.Pokemon();
        return pokemon.getEvolution((String) pokemons.get("id"));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/pokemon")
    public String pokemon(@RequestBody Map<String, Object> pokemons) throws IOException, InterruptedException {
        pat.services.Pokemon pokemon = new pat.services.Pokemon();
        return pokemon.getPokemon((String) pokemons.get("name"));
    }
}
