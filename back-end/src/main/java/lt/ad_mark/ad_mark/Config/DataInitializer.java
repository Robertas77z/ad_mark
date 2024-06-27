package lt.ad_mark.ad_mark.Config;

import lt.ad_mark.ad_mark.entity.Role;
import lt.ad_mark.ad_mark.entity.User;
import lt.ad_mark.ad_mark.repository.RoleRepository;
import lt.ad_mark.ad_mark.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataInitializer {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = new Role();
                adminRole.setName("ROLE_ADMIN");
            }

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);


            if (!userRepository.existsByUsername("admin")) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@admin.com");
                adminUser.setPassword(passwordEncoder.encode("admin"));
                adminUser.setRoles(roles);
                userRepository.save(adminUser);
            }
        };
    }
}