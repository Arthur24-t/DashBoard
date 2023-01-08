package pat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;


import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class DashboardApplication {

	public static void main(String[] args) throws IOException, InterruptedException, FirebaseAuthException {
		SpringApplication.run(DashboardApplication.class, args);
		FileInputStream serviceAccount = new FileInputStream("src/main/java/pat/serviceAccountKey.json");

		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

		FirebaseApp.initializeApp(options);
	}

}
