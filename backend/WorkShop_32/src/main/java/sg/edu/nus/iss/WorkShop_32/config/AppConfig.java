package sg.edu.nus.iss.WorkShop_32.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;



@Configuration
public class AppConfig {

    @Value("${spaces.key.secret}")
    private String secretKey;

    @Value("${spaces.key.access}")
    private String accessKey;

}
