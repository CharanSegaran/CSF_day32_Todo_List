package sg.edu.nus.iss.WorkShop_32;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig{
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests((requests) -> requests.requestMatchers("/**")
                                                         .permitAll().anyRequest().authenticated())
                                                         .csrf(AbstractHttpConfigurer::disable)
                                                         .cors(Customizer.withDefaults());
        return http.build();                         
    }
}
