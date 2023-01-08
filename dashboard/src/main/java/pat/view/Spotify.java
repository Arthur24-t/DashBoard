package pat.view;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Spotify {
    @CrossOrigin(origins = "*")
    @GetMapping("/getPlaylist")
    public String playlist() throws IOException, InterruptedException {
        pat.services.Spotify spotify = new pat.services.Spotify();
        return spotify.getTop();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/search")
    public String playlist(@RequestBody Map<String, Object> titles) throws IOException, InterruptedException {
        pat.services.Spotify spotify = new pat.services.Spotify();
        return spotify.search((String) titles.get("title"));
    }
}